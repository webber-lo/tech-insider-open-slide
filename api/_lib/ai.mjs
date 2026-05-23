const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export function missingKeys(names) {
  return names.filter((name) => !process.env[name]);
}

async function safeCall(provider, fn) {
  try {
    const text = await fn();
    return { provider, ok: true, text };
  } catch (error) {
    return { provider, ok: false, error: error.message };
  }
}

export async function callOpenAI(prompt) {
  if (!process.env.OPENAI_API_KEY) return { provider: "OpenAI", ok: false, missing: "OPENAI_API_KEY" };
  return safeCall("OpenAI", async () => {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input: prompt
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "OpenAI request failed");
    return data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text).filter(Boolean).join("\n") || "";
  });
}

export async function callAnthropic(prompt) {
  if (!process.env.ANTHROPIC_API_KEY) return { provider: "Claude", ok: false, missing: "ANTHROPIC_API_KEY" };
  return safeCall("Claude", async () => {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1800,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Claude request failed");
    return data.content?.map((item) => item.text).filter(Boolean).join("\n") || "";
  });
}

export async function callGemini(prompt) {
  if (!process.env.GEMINI_API_KEY) return { provider: "Gemini", ok: false, missing: "GEMINI_API_KEY" };
  return safeCall("Gemini", async () => {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Gemini request failed");
    return data.candidates?.[0]?.content?.parts?.map((part) => part.text).filter(Boolean).join("\n") || "";
  });
}

export function fallbackOutline(article) {
  const compact = article.replace(/\s+/g, " ").trim();
  const summary = compact.length > 80 ? `${compact.slice(0, 80)}...` : compact;
  const seed = compact || "請貼上文章，生成簡報內容。";
  const pages = [
    {
      page: 1,
      layout: "",
      title: compact ? "把長文整理成一個清楚的開場主張" : "請貼上文章，生成第一頁主張",
      lead: compact ? `來源重點：${summary}` : seed,
      tags: ["原文", "主張", "重點", "順序"]
    },
    {
      page: 2,
      layout: "",
      title: "為什麼這件事現在重要？",
      lead: "整理事件背景、產業變化與使用者需要理解的主要矛盾。",
      tags: ["背景", "變化", "問題", "脈絡"]
    },
    {
      page: 3,
      layout: "",
      title: "影響會落在哪些角色身上？",
      lead: "把利害關係人、平台、企業與內容團隊的影響拆成可理解的段落。",
      tags: ["角色", "影響", "利害關係", "決策"]
    },
    {
      page: 4,
      layout: "",
      title: "接下來可能怎麼演變？",
      lead: "整理短期反應、中期調整與長期結構變化。",
      tags: ["短期", "中期", "長期", "變化"]
    },
    {
      page: 5,
      layout: "",
      title: "不同做法的取捨是什麼？",
      lead: "比較傳統做法、AI 協作流程與 OpenSlide SDD 的差異。",
      tags: ["傳統", "AI", "SDD", "取捨"]
    },
    {
      page: 6,
      layout: "",
      title: "最後要留下哪個判斷？",
      lead: "收斂成一個清楚的商業科技觀點，作為簡報結論。",
      tags: ["判斷", "結論", "下一步", "觀點"]
    }
  ];
  return {
    title: pages[0].title,
    lead: `${pages[0].lead}。系統會把原文改寫成每頁主張、講述順序與 OpenSlide 可排版文字。`,
    captions: ["原文", "主張", "版型", "預覽"],
    pages
  };
}

export function buildFallbackPages(article, targetPages = 6) {
  const pages = fallbackOutline(article).pages;
  const fitted = pages.slice(0, targetPages);
  while (fitted.length < targetPages) {
    const previous = fitted.at(-1) || pages.at(-1);
    fitted.push({
      ...previous,
      page: fitted.length + 1,
      title: `${previous.title}：延伸重點`.slice(0, 44)
    });
  }
  return fitted.map((page, index) => ({ ...page, page: index + 1, layout: "" }));
}
