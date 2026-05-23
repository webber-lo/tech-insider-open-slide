# Deployment

The GitHub Pages URL is a static preview only.

For working AI calls, deploy to a serverless host such as Vercel and set these environment variables in the host's secrets/settings UI:

```env
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
ANTHROPIC_MODEL=claude-sonnet-4-20250514
GEMINI_MODEL=gemini-2.5-flash
```

The frontend calls:

- `POST /api/generate-outline`
- `POST /api/suggest-image-style`

Those functions read secrets from the server environment. Do not put API keys in `deck-generator-prototype.html`.

## Local Check

Run the full local app:

```bash
npm run dev:app
```

Then open:

```txt
http://127.0.0.1:8787/
```

## Vercel Checklist

1. Import or deploy `webber-lo/tech-insider-open-slide`.
2. Set environment variables in Vercel Project Settings:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `GEMINI_API_KEY`
   - `OPENAI_MODEL`
   - `ANTHROPIC_MODEL`
   - `GEMINI_MODEL`
3. Redeploy after secrets are saved.
4. Test:
   - open the deployed URL
   - paste article text
   - click `生成簡報大綱`
   - click `產生無文字配圖風格`
