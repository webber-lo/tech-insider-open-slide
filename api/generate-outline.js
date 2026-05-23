import { callAnthropic, callGemini, callOpenAI, json, missingKeys, readJsonBody } from "./_lib/ai.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Use POST" });

  const { article = "", audience = "", pageCount = "", design = "" } = await readJsonBody(req);
  const targetPages = parsePageTarget(pageCount, article);
  const prompt = [
    "You are a structure-first presentation planner.",
    "Read the source text before deciding any slide layout.",
    "Do not force a fixed framework such as tags, main channel, update frequency, or any topic-specific fields.",
    "First extract the meaningful structure that already exists in the text, then preserve it.",
    `Create exactly ${targetPages} pages.`,
    "Each page must use this JSON shape:",
    JSON.stringify({
      pages: [
        {
          page: 1,
          title: "page title",
          claim: "main meaning of this page",
          blocks: [{ label: "field name from the source text", value: "preserved useful detail" }],
          layoutHint: "Narrative | Comparison | Matrix | Timeline | Process | Profile | List | Relationship | Quote | Cover",
          imageBrief: "text-free visual direction"
        }
      ]
    }),
    "Rules:",
    "- blocks are not decorative captions. They are the important content structure from the source.",
    "- Use source-specific block labels. For a book, labels may be chapter point/case/concept. For astrology, labels may be behavior clue/psychological function/limit. For a program plan, labels may be whatever appears in the source.",
    "- Keep concrete details such as frequency, duration, structure, source, names, numbers, or constraints when they matter.",
    "- Do not invent meaningless generic blocks.",
    "- Do not output Markdown, HTML, or commentary. Output JSON only.",
    `Audience: ${audience}`,
    `Page count control: ${pageCount || "auto from source"}, target pages: ${targetPages}`,
    `Design context: ${design}`,
    `Source text:\n${article}`
  ].join("\n\n");

  const [gemini, claude, openai] = await Promise.all([
    callGemini(`Extract meaning blocks and return JSON only:\n${prompt}`),
    callAnthropic(`Plan pages from source structure and return JSON only:\n${prompt}`),
    callOpenAI(`Finalize the structured pages as JSON only:\n${prompt}`)
  ]);

  const successful = [gemini, claude, openai].filter((item) => item.ok && item.text);
  const best = successful.at(-1)?.text || "";
  const pages = fitPageCount(extractPages(best), targetPages) || buildFallbackPages(article, targetPages);

  return json(res, 200, {
    ok: successful.length > 0,
    missingKeys: missingKeys(["GEMINI_API_KEY", "ANTHROPIC_API_KEY", "OPENAI_API_KEY"]),
    providers: { gemini, claude, openai },
    outline: {
      title: pages[0]?.title || "Structured deck",
      claim: pages[0]?.claim || "",
      pages
    },
    rawText: best
  });
}

function parsePageTarget(pageCount, article) {
  const selected = String(pageCount || "").trim();
  if (selected && selected !== "auto" && !selected.includes("依文章")) {
    const selectedNumber = selected.match(/\d+/)?.[0];
    if (selectedNumber) return clampPageCount(Number(selectedNumber));
  }

  const articleNumber = String(article || "").match(/(?:做成|整理成|產出|生成|規劃成|製作成|共|總共)?\s*(\d{1,2})\s*(?:頁|p|P|slides?|Slides?)/)?.[1];
  if (articleNumber) return clampPageCount(Number(articleNumber));

  return 8;
}

function clampPageCount(value) {
  return Math.max(1, Math.min(24, value));
}

function extractPages(text) {
  if (!text) return null;
  const jsonText = text.match(/```json\s*([\s\S]*?)```/i)?.[1] || text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/i)?.[1];
  if (!jsonText) return null;
  try {
    const parsed = JSON.parse(jsonText);
    const pages = Array.isArray(parsed) ? parsed : parsed.pages || parsed.slides;
    const normalized = normalizePages(pages);
    return normalized.length ? normalized : null;
  } catch {
    return null;
  }
}

function normalizePages(pages) {
  if (!Array.isArray(pages)) return [];
  return pages.map((page, index) => ({
    page: index + 1,
    title: clean(page.title || page.slideTitle || `第 ${index + 1} 頁`, 64),
    claim: clean(page.claim || page.lead || page.summary || page.body || "", 260),
    blocks: normalizeBlocks(page.blocks || page.details || page.items || page.sections),
    layoutHint: clean(page.layoutHint || page.layout || "", 40),
    imageBrief: clean(page.imageBrief || page.visualBrief || "", 160)
  })).filter((page) => page.title);
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

function fitPageCount(pages, target) {
  if (!Array.isArray(pages) || !pages.length) return null;
  const fitted = pages.slice(0, target);
  while (fitted.length < target) {
    fitted.push({
      page: fitted.length + 1,
      title: `補充頁 ${fitted.length + 1}`,
      claim: "這一頁需要由原始資料補足更明確的內容。",
      blocks: [],
      layoutHint: "List",
      imageBrief: "abstract editorial visual, no text"
    });
  }
  return fitted.map((page, index) => ({ ...page, page: index + 1 }));
}

function buildFallbackPages(article, target) {
  const chunks = splitSource(article, target);
  return chunks.map((chunk, index) => ({
    page: index + 1,
    title: index === 0 ? "內容結構整理" : `內容重點 ${index + 1}`,
    claim: clean(chunk, 180),
    blocks: extractSimpleBlocks(chunk),
    layoutHint: index === 0 ? "Cover" : "List",
    imageBrief: "text-free editorial visual"
  }));
}

function splitSource(article, target) {
  const text = String(article || "").replace(/\s+/g, " ").trim() || "請輸入內容。";
  const size = Math.max(80, Math.ceil(text.length / target));
  const chunks = [];
  for (let i = 0; i < target; i += 1) chunks.push(text.slice(i * size, (i + 1) * size));
  return chunks;
}

function extractSimpleBlocks(text) {
  return String(text || "")
    .split(/[。；;\n]/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 4)
    .map((value, index) => ({ label: `重點 ${index + 1}`, value: clean(value, 180) }));
}

function clean(value, max) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}
