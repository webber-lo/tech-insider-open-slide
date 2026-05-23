import { buildFallbackPages, callAnthropic, callGemini, callOpenAI, fallbackOutline, json, missingKeys, readJsonBody } from "./_lib/ai.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Use POST" });

  const { article = "", audience = "", pageCount = "", design = "" } = await readJsonBody(req);
  const targetPages = parsePageTarget(pageCount);
  const prompt = [
    "你是 TECH INSIDER 的簡報內容規劃顧問。",
    "請把使用者提供的長文整理成適合簡報的逐頁內容。",
    `請產生剛好 ${targetPages} 頁，不要少於或多於這個頁數。`,
    "這一步只處理內容，不要替頁面選 layout，也不要描述圖片。",
    "每頁需要有 page, title, lead, tags。",
    "tags 是頁面底部可編輯的資訊標籤，請依照該頁內容生成 3 到 4 個短標籤，不要使用固定模板。",
    "請只輸出 JSON，格式為 {\"pages\":[...]}，不要輸出 Markdown 或 HTML。",
    "不要產生圖片提示詞，不要產生 HTML。",
    `對象：${audience}`,
    `頁數：${pageCount}`,
    `設計方向只作為語氣參考，不要輸出版型：${design}`,
    `文章：${article}`
  ].join("\n\n");

  const [gemini, claude, openai] = await Promise.all([
    callGemini(`請規劃內容結構並輸出 JSON：\n${prompt}`),
    callAnthropic(`請整理簡報逐頁主張並輸出 JSON：\n${prompt}`),
    callOpenAI(`請做最後內容整合並輸出 JSON：\n${prompt}`)
  ]);

  const fallback = fallbackOutline(article);
  const successful = [gemini, claude, openai].filter((item) => item.ok && item.text);
  const best = successful.at(-1)?.text || "";
  const pages = fitPageCount(extractPages(best), targetPages) || buildFallbackPages(article, targetPages);

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

function parsePageTarget(pageCount) {
  const numbers = String(pageCount || "").match(/\d+/g)?.map(Number).filter(Boolean) || [];
  if (!numbers.length) return 8;
  return Math.max(1, Math.min(24, Math.max(...numbers)));
}

function fitPageCount(pages, target) {
  if (!Array.isArray(pages) || !pages.length) return null;
  const fitted = pages.slice(0, target);
  while (fitted.length < target) {
    const previous = fitted.at(-1) || pages.at(-1);
    fitted.push({
      page: fitted.length + 1,
      layout: "",
      title: `${previous.title}：延伸重點`.slice(0, 44),
      lead: previous.lead || "補充這個主題的下一個關鍵角度。",
      tags: previous.tags?.length ? previous.tags.slice(0, 4) : ["延伸", "補充", "重點"]
    });
  }
  return fitted.map((page, index) => ({ ...page, page: index + 1, layout: page.layout || "" }));
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

  const blocks = text.split(/\n(?=\s*(?:第\s*\d+\s*頁|Slide\s*\d+|Page\s*\d+))/i);
  const pages = blocks
    .map((block, index) => {
      const lines = block.split(/\r?\n/).map((line) => line.replace(/^[#*\-\d.\s:：]+/, "").trim()).filter(Boolean);
      if (!lines.length) return null;
      return {
        page: index + 1,
        layout: "",
        title: lines[0].slice(0, 44),
        lead: lines.slice(1).join(" ").slice(0, 180) || lines[0],
        tags: inferTags(lines.join(" "))
      };
    })
    .filter(Boolean);
  return pages.length >= 2 ? pages : null;
}

function normalizePages(pages) {
  if (!Array.isArray(pages)) return [];
  return pages.map((page, index) => ({
    page: Number(page.page || index + 1),
    layout: String(page.layout || ""),
    title: String(page.title || page.slideTitle || `第 ${index + 1} 頁`).slice(0, 44),
    lead: String(page.lead || page.summary || page.body || "").slice(0, 180),
    tags: Array.isArray(page.tags) && page.tags.length ? page.tags.slice(0, 4).map(String) : inferTags(`${page.title || ""} ${page.lead || ""}`)
  })).filter((page) => page.title);
}

function inferTags(text) {
  const source = String(text || "");
  const candidates = ["趨勢", "問題", "角色", "影響", "策略", "風險", "機會", "下一步"];
  return candidates.filter((tag) => source.includes(tag)).slice(0, 4).concat(candidates).slice(0, 4);
}
