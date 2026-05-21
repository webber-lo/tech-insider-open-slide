# TECH INSIDER OpenSlide SDD

這個資料夾是一套 AI 可操作的簡報系統，而不是單純的一份 PPT 原始碼。

## File Responsibilities

- `index.tsx`: OpenSlide entry only. Do not put slide content or layout logic here.
- `content.ts`: User-editable content layer. Titles, copy, program data, examples, and palette descriptions live here.
- `schema.ts`: Content schema. Use this to keep future edits predictable.
- `theme.ts`: Brand tokens. Colors, typography, spacing, radius, shadows, and base page styles live here.
- `components.tsx`: Reusable slide masters and layout components.
- `slides.tsx`: Deck assembly. Controls page order and share/full variants.
- `wireframes.ts`: Wireframe library registry. Implemented and planned page types live here.
- `open-design.ts`: Open Design-aligned manifest, discovery questions, design directions, and self-review checklist.
- `ai-prompt.md`: Operating prompt for future AI/Codex work.

## Open Design Alignment

This SDD follows the Open Design idea of an agent-native, artifact-first design workflow:

- Treat the deck as a real OpenSlide artifact on disk, not a flat image or disposable prompt result.
- Lock requirements before design work: surface, audience, tone, brand context, and scale.
- Use deterministic brand tokens and wireframes instead of freestyle visual invention.
- Keep a pre-flight checklist and a final self-review checklist in the project.
- Make export and preview part of the loop, not an afterthought.

The local manifest is encoded in `open-design.ts`:

- `mode`: `deck`
- `scenario`: `marketing`, `product`, `operation`
- `artifact`: `open-slide-deck`
- `preview`: `/s/tech-insider-channel-plan` and `/s/tech-insider-channel-plan-share`
- `designSystem.requires`: brand tokens, wireframes, content schema, preflight, self-review

## Current Deck Variants

- Full deck: `tech-insider-channel-plan`, 8 pages, includes the palette reference appendix.
- Share deck: `tech-insider-channel-plan-share`, 7 pages, omits the palette reference appendix.

## Implemented Wireframes

- `CoverPage`: channel title, positioning, and three strategic cards.
- `TrustPyramidPage`: four-layer trust or strategy pyramid.
- `ProgramPage`: reusable page for recurring editorial programs.
- `MythClassPage`: 16:9 short-form explainer concept page.
- `PaletteReferencePage`: brand color and token reference appendix.

## Planned Wireframes

- `SectionPage`: chapter divider.
- `MatrixPage`: 2x2 decision or content portfolio matrix.
- `TimelinePage`: publishing cadence, launch plan, or production workflow.
- `ImageHeroPage`: bitmap visual plus OpenSlide-rendered Chinese text.
- `ComparisonPage`: old/new, before/after, or option comparison.
- `Vertical916Page`: separate 9:16 vertical infographic deck.

## AI Editing Rules

1. Run discovery first when the request is under-specified: surface, audience, tone, brand context, and scale.
2. Choose one design direction from `open-design.ts`; default to `Tech Utility` for TECH INSIDER strategy decks.
3. If the user only changes wording or content, edit `content.ts`.
4. If the user changes brand rules, edit `theme.ts`.
5. If the user asks for a new reusable page type, add it to `components.tsx` and register it in `wireframes.ts`.
6. If the user changes page order or deck variant rules, edit `slides.tsx`.
7. Keep Chinese text rendered by OpenSlide. Do not bake Chinese text into generated images.
8. Use brand colors from `theme.ts`; do not invent one-off colors.
9. Keep `index.tsx` thin.

## Preflight

Before changing or generating slides, confirm these decisions from `open-design.ts`:

- `surface`: 16:9 proposal deck, share deck, exported PDF, PPTX handoff, or separate 9:16 artifact.
- `audience`: internal editorial planning, executives, partners, sponsors, or public sharing.
- `tone`: strategic, editorial, sales-oriented, operational, or teaching-oriented.
- `brand-context`: TECH INSIDER brand tokens unless explicitly overridden.
- `scale`: target slide count, density, and whether the palette/reference appendix is included.

## Design Directions

- `Tech Utility`: default. Quiet, structured, business-tech presentation language.
- `Editorial Monocle`: for magazine-like issue framing or premium editorial storytelling.
- `Modern Minimal`: for executive summaries and low-noise stakeholder updates.

Do not switch direction silently. If a request implies a different direction, name the choice in the working notes or final summary.

## Self-Review

Use the checklist in `open-design.ts` before finishing:

- Content: each slide has one clear claim or module.
- Brand: colors, typography, cards, tags, and page numbers come from SDD tokens.
- Layout: pages are reusable components, not one-off JSX pasted around text.
- Artifact: readable Chinese text remains OpenSlide-rendered.
- Export: full and share variants build and load.

## Verification

On this machine, the default WindowsApps `node.exe` may be blocked. Use the local Node runtime:

```powershell
& "C:\Users\webbe\OneDrive\文件\新媒體企劃\.tools\node-v22.16.0-win-x64\node.exe" node_modules\@open-slide\core\bin.js build
```

For local preview:

```powershell
& "C:\Users\webbe\OneDrive\文件\新媒體企劃\.tools\node-v22.16.0-win-x64\node.exe" node_modules\@open-slide\core\bin.js dev --host 127.0.0.1
```

Expected routes:

- `/s/tech-insider-channel-plan`
- `/s/tech-insider-channel-plan-share`
