import { callAnthropic, callOpenAI, json, missingKeys, readJsonBody } from "./_lib/ai.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Use POST" });

  const { page = {}, action = "sharpen" } = await readJsonBody(req);
  const prompt = [
    "你是 TECH INSIDER 的簡報編輯。",
    "請只改寫單頁內容，不要新增整份簡報。",
    "輸出 JSON：{\"title\":\"...\",\"lead\":\"...\",\"tags\":[\"...\",\"...\",\"...\"]}",
    "title 要像簡報標題，清楚、有商業科技角度。",
    "lead 是 1 到 2 句主張，不要太長。",
    "tags 是頁面底部可編輯短標籤，3 到 4 個，依內容生成，不要固定模板。",
    `改寫方向：${action}`,
    `原標題：${page.title || ""}`,
    `原主張：${page.lead || ""}`,
    `原標籤：${(page.tags || []).join("、")}`
  ].join("\n\n");

  const [claude, openai] = await Promise.all([
    callAnthropic(prompt),
    callOpenAI(prompt)
  ]);
  const successful = [claude, openai].filter((item) => item.ok && item.text);
  const best = successful.at(-1)?.text || "";
  const refined = extractRefined(best) || fallbackRefined(page, action);

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
      title: String(parsed.title || "").slice(0, 44),
      lead: String(parsed.lead || parsed.summary || "").slice(0, 180),
      tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 4).map(String) : []
    };
  } catch {
    return null;
  }
}

function fallbackRefined(page, action) {
  const prefix = action === "shorten" ? "精簡：" : action === "stronger" ? "關鍵主張：" : "重整：";
  return {
    title: `${prefix}${page.title || "本頁重點"}`.slice(0, 44),
    lead: String(page.lead || "請補上這頁的主要主張。").slice(0, 160),
    tags: Array.isArray(page.tags) && page.tags.length ? page.tags.slice(0, 4) : ["主張", "重點", "下一步"]
  };
}
