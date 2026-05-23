import { callAnthropic, callOpenAI, json, missingKeys, readJsonBody } from "./_lib/ai.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Use POST" });

  const { page = {}, action = "sharpen" } = await readJsonBody(req);
  const prompt = [
    "You are editing one structured presentation page.",
    "Keep the user's source-specific structure. Do not convert blocks into generic tags.",
    "Return JSON only with this shape:",
    JSON.stringify({
      title: "page title",
      claim: "main meaning",
      blocks: [{ label: "source-specific label", value: "preserved detail" }],
      layoutHint: "recommended layout",
      imageBrief: "text-free visual direction"
    }),
    `Action: ${action}`,
    `Current page:\n${JSON.stringify(page)}`
  ].join("\n\n");

  const [claude, openai] = await Promise.all([
    callAnthropic(prompt),
    callOpenAI(prompt)
  ]);
  const successful = [claude, openai].filter((item) => item.ok && item.text);
  const best = successful.at(-1)?.text || "";
  const refined = extractRefined(best) || fallbackRefined(page);

  return json(res, 200, {
    ok: successful.length > 0,
    missingKeys: missingKeys(["ANTHROPIC_API_KEY", "OPENAI_API_KEY"]),
    providers: { claude, openai },
    page: refined,
    rawText: best
  });
}

function extractRefined(text) {
  if (!text) return null;
  const jsonText = text.match(/```json\s*([\s\S]*?)```/i)?.[1] || text.match(/(\{[\s\S]*\})/i)?.[1];
  if (!jsonText) return null;
  try {
    const parsed = JSON.parse(jsonText);
    return {
      title: clean(parsed.title, 64),
      claim: clean(parsed.claim || parsed.lead || parsed.summary, 260),
      blocks: normalizeBlocks(parsed.blocks || parsed.details || parsed.items),
      layoutHint: clean(parsed.layoutHint || parsed.layout, 40),
      imageBrief: clean(parsed.imageBrief || parsed.visualBrief, 160)
    };
  } catch {
    return null;
  }
}

function fallbackRefined(page) {
  return {
    title: clean(page.title || "本頁重點", 64),
    claim: clean(page.claim || page.lead || "請補上這頁的主要意思。", 260),
    blocks: normalizeBlocks(page.blocks || []),
    layoutHint: clean(page.layoutHint || page.layout || "List", 40),
    imageBrief: clean(page.imageBrief || "text-free editorial visual", 160)
  };
}

function normalizeBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .map((block) => {
      if (typeof block === "string") return { label: "重點", value: clean(block, 220) };
      return {
        label: clean(block.label || block.name || block.key || "重點", 32),
        value: clean(block.value || block.text || block.content || "", 260)
      };
    })
    .filter((block) => block.label && block.value)
    .slice(0, 8);
}

function clean(value, max) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}
