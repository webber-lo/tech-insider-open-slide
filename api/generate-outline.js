import { buildFallbackPages, callAnthropic, callGemini, callOpenAI, fallbackOutline, json, missingKeys, readJsonBody } from "./_lib/ai.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Use POST" });

  const { article = "", audience = "", pageCount = "", design = "" } = await readJsonBody(req);
  const prompt = [
    "你是 TECH INSIDER 的簡報編輯系統。",
    "請把使用者提供的長文整理成一份 6 頁簡報內容草稿，回覆繁體中文。",
    "這一步只做資料處理，不要替使用者選版型，不要生圖。",
    "每頁都要有：page, title, lead, tags。",
    "tags 是本頁重點，不是視覺版型。",
    "請優先輸出 JSON，不要輸出 HTML。",
    "不要產生圖片文字，不要產生 HTML。",
    `受眾：${audience}`,
    `頁數：${pageCount}`,
    `目前設計方向僅供語氣參考，不能決定版型：${design}`,
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
  const pages = extractPages(best) || buildFallbackPages(article);

  return json(res, 200, {
    ok: successful.length > 0,
    missingKeys: missingKeys(["GEMINI_API_KEY", "ANTHROPIC_API_KEY", "OPENAI_API_KEY"]),
    providers: { gemini, claude, openai },
    outline: {
      title: pages[0]?.title || fallback.title,
      lead: pages[0]?.lead || fallback.lead,
      captions: pages[0]?.tags?.slice(0, 4) || fallback.captions,
      pages
    },
    rawText: best
  });
}

function extractPages(text) {
  if (!text) return null;
  const jsonText = text.match(/```json\s*([\s\S]*?)```/i)?.[1] || text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/i)?.[1];
  if (jsonText) {
    try {
      const parsed = JSON.parse(jsonText);
      const pages = Array.isArray(parsed) ? parsed : parsed.pages || parsed.slides;
      const normalized = normalizePages(pages);
      if (normalized.length) return normalized;
    } catch {
      // Fall back to text extraction below.
    }
  }
  const blocks = text.split(/\n(?=\s*(?:第?\s*\d+\s*[頁.、)]|Slide\s*\d+|Page\s*\d+))/i);
  const pages = blocks
    .map((block, index) => {
      const lines = block.split(/\r?\n/).map((line) => line.replace(/^[#*\-\d.\s:：]+/, "").trim()).filter(Boolean);
      if (!lines.length) return null;
      return {
        page: index + 1,
        layout: inferLayout(index),
        title: lines[0].slice(0, 44),
        lead: lines.slice(1).join(" ").slice(0, 150) || lines[0],
        tags: ["主張", "重點", "版型"]
      };
    })
    .filter(Boolean);
  return pages.length >= 2 ? pages.slice(0, 6) : null;
}

function normalizePages(pages) {
  if (!Array.isArray(pages)) return [];
  return pages.slice(0, 8).map((page, index) => ({
    page: Number(page.page || index + 1),
    layout: String(page.layout || ""),
    title: String(page.title || page.slideTitle || `第 ${index + 1} 頁`).slice(0, 44),
    lead: String(page.lead || page.summary || page.body || "").slice(0, 180),
    tags: Array.isArray(page.tags) ? page.tags.slice(0, 4).map(String) : ["主張", "重點", "版型"]
  })).filter((page) => page.title);
}

function inferLayout(index) {
  return ["Cover", "Problem", "Matrix", "Timeline", "Comparison", "Closing"][index] || "Section";
}
