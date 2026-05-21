# Deployment

The GitHub Pages URL is a static preview only.

For working AI calls, deploy to a serverless host such as Vercel and set these environment variables in the host's secrets/settings UI:

```env
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
GEMINI_MODEL=gemini-1.5-flash
```

The frontend calls:

- `POST /api/generate-outline`
- `POST /api/suggest-image-style`

Those functions read secrets from the server environment. Do not put API keys in `deck-generator-prototype.html`.
