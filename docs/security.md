# Security Notes

API keys must not be committed to this repository.

Use this local file for real keys:

```txt
C:\Users\webbe\.tech-insider-sdd\.env
```

The repository only keeps `.env.example` so the required variable names are documented without exposing secrets.

Fill the local file like this:

```env
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_claude_key_here
GEMINI_API_KEY=your_gemini_key_here
```

Important: GitHub Pages is static hosting. It cannot safely read private API keys. For a live hosted version, connect the frontend to a backend or serverless function and put these keys in that platform's secret manager.
