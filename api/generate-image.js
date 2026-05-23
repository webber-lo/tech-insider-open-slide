import { json, missingKeys, readJsonBody } from "./_lib/ai.mjs";

const IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1-mini";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Use POST" });
  if (!process.env.OPENAI_API_KEY) {
    return json(res, 200, { ok: false, missingKeys: missingKeys(["OPENAI_API_KEY"]), error: "Missing OPENAI_API_KEY" });
  }

  const { title = "", lead = "", layout = "", purpose = "", design = "" } = await readJsonBody(req);
  const prompt = [
    "Create a single presentation illustration for TECH INSIDER.",
    "Absolutely no readable text: no Chinese, no English, no numbers, no letters, no logo, no UI text, no labels, no signage, no watermark.",
    "Use an editorial business-technology visual style with integrated composition, soft but professional lighting, and clear negative space for OpenSlide text overlay.",
    `Slide title context: ${title}`,
    `Slide summary context: ${lead}`,
    `Layout direction: ${layout || "not selected yet"}`,
    `Image purpose: ${purpose}`,
    `Design direction: ${design}`,
    "The image should communicate the topic through abstract technology, people silhouettes, geometric systems, or business-tech environments only. No typography."
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      prompt,
      size: "1536x1024",
      quality: "low",
      output_format: "webp"
    })
  });

  const data = await response.json();
  if (!response.ok) {
    return json(res, 200, { ok: false, missingKeys: [], error: data.error?.message || "Image generation failed" });
  }

  const b64 = data.data?.[0]?.b64_json;
  if (!b64) return json(res, 200, { ok: false, missingKeys: [], error: "No image returned" });

  return json(res, 200, {
    ok: true,
    imageDataUrl: `data:image/webp;base64,${b64}`
  });
}
