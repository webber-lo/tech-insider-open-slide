import { callGemini, callOpenAI, json, missingKeys, readJsonBody } from "./_lib/ai.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Use POST" });

  const { purpose = "", design = "", hasReferenceImage = false } = await readJsonBody(req);
  const prompt = [
    "你是簡報配圖風格顧問。",
    "請為 TECH INSIDER 簡報提出無文字配圖建議。",
    "重要規則：圖片中不得出現任何中文、英文、數字、logo、標籤、招牌或可讀文字。",
    "請輸出：風格、構圖、色彩、畫面元素、負面提示。",
    `設計方向：${design}`,
    `配圖目的：${purpose}`,
    `使用者是否提供參考圖：${hasReferenceImage ? "是" : "否"}`
  ].join("\n\n");

  const [gemini, openai] = await Promise.all([
    callGemini(`請提出視覺風格與構圖建議：\n${prompt}`),
    callOpenAI(`請收斂成可給生圖模型使用的無文字提示：\n${prompt}`)
  ]);

  const successful = [gemini, openai].filter((item) => item.ok && item.text);

  return json(res, 200, {
    ok: successful.length > 0,
    missingKeys: missingKeys(["GEMINI_API_KEY", "OPENAI_API_KEY"]),
    providers: { gemini, openai },
    stylePrompt: successful.at(-1)?.text || "無文字、 editorial technology explainer illustration, soft integrated composition, no text, no letters, no numbers, no logos"
  });
}
