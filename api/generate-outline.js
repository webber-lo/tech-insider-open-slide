import { callAnthropic, callGemini, callOpenAI, fallbackOutline, json, missingKeys, readJsonBody } from "./_lib/ai.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Use POST" });

  const { article = "", audience = "", pageCount = "", design = "" } = await readJsonBody(req);
  const prompt = [
    "你是 TECH INSIDER 的簡報編輯系統。",
    "請把使用者提供的長文整理成簡報第一頁草稿，回覆繁體中文。",
    "請輸出：1. slide title 2. lead paragraph 3. four short tags。",
    "不要產生圖片文字，不要產生 HTML。",
    `受眾：${audience}`,
    `頁數：${pageCount}`,
    `設計方向：${design}`,
    `文章：${article}`
  ].join("\n\n");

  const [gemini, claude, openai] = await Promise.all([
    callGemini(`請分析資料脈絡與重點：\n${prompt}`),
    callAnthropic(`請整理敘事結構與頁面主張：\n${prompt}`),
    callOpenAI(`請收斂成簡報可用文字：\n${prompt}`)
  ]);

  const fallback = fallbackOutline(article);
  const successful = [gemini, claude, openai].filter((item) => item.ok && item.text);
  const best = successful.at(-1)?.text || "";

  return json(res, 200, {
    ok: successful.length > 0,
    missingKeys: missingKeys(["GEMINI_API_KEY", "ANTHROPIC_API_KEY", "OPENAI_API_KEY"]),
    providers: { gemini, claude, openai },
    outline: {
      title: best.split("\n").find(Boolean)?.replace(/^[-#\d.\s]+/, "").slice(0, 42) || fallback.title,
      lead: best.replace(/\s+/g, " ").slice(0, 150) || fallback.lead,
      captions: fallback.captions
    }
  });
}
