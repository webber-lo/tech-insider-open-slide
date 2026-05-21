# open-slide workspace

TECH INSIDER OpenSlide / SDD workspace for AI-operable presentation authoring.

## Deck Generator Prototype

Local full app with API proxy:

```bash
npm run dev:app
```

Open:

```txt
http://127.0.0.1:8787/
```

It currently supports:

- choosing a design direction and updating the right-side `Artifact Preview`
- calling `/api/generate-outline` to coordinate Gemini, Claude, and OpenAI
- calling `/api/suggest-image-style` for no-text illustration style guidance
- uploading a reference image for visual direction

## API Keys

Real API keys are stored outside this repository:

```txt
C:\Users\webbe\.tech-insider-sdd\.env
```

Use `.env.example` only as a variable-name reference. Do not commit real keys.

Fill the local file:

```env
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
```

GitHub Pages is preview-only because it cannot safely store private API keys. Deploy the app to Vercel or another serverless platform and set the same variables as deployment secrets for the AI calls to work online.

Slides as React components. Each slide lives under `slides/<id>/index.tsx` and default-exports an array of page components. The `@open-slide/core` runtime handles layout, scaling, navigation, thumbnails, and fullscreen play mode — you just write the pages.

## Getting started

```bash
pnpm install
pnpm dev
```

Then open the dev server and edit `slides/getting-started/index.tsx`, or create a new slide at `slides/<your-slide>/index.tsx`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server with hot reload. |
| `pnpm build` | Build a static bundle you can deploy. |
| `pnpm preview` | Preview the built bundle locally. |

## Authoring a slide

```tsx
// slides/my-slide/index.tsx
import type { Page, SlideMeta } from '@open-slide/core';

const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%' }}>Hello</div>
);

export const meta: SlideMeta = { title: 'My slide' };
export default [Cover] satisfies Page[];
```

Every page renders into a fixed **1920 × 1080** canvas — design with absolute pixel values. Put images, videos, and fonts under `slides/<id>/assets/` and import them directly.

See [`CLAUDE.md`](./CLAUDE.md) for the full authoring guide.

## Navigation

- Arrow keys / PageUp / PageDown move between pages.
- `F` enters fullscreen play mode; Esc exits.
- In play mode: Space / → next, ← prev.

## Claude Code integration

This workspace ships with Claude Code skills preconfigured under `.claude/skills/` and `.agents/skills/`. Ask Claude Code to "make slides about X" and the `create-slide` skill takes over. Use `apply-comments` to iterate via inspector-style markers inside your source.

## Config

Optional `open-slide.config.ts` at the workspace root:

```ts
import type { OpenSlideConfig } from '@open-slide/core';

const openSlideConfig: OpenSlideConfig = {
  port: 5173,
};

export default openSlideConfig;
```

Supported fields: `slidesDir`, `port`.
