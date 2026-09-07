# REAL FORGE

**FORGE REALITY.**

REAL FORGE is an AI creative production studio for turning a short idea into a photorealistic image, then reviewing, refining, and saving it inside a project library.

It is built as a serious production workspace — not a toy prompt box.

**Repository:** [github.com/fategamer/real-forge](https://github.com/fategamer/real-forge)

---

## What it is

Creators, marketers, and filmmakers enter one sentence. REAL FORGE expands that sentence into a structured production prompt (camera, lens, light, atmosphere, negative prompt), generates a visual, and files the result in Library and Projects.

Core loop:

```
Idea → Reality Engine → Forge → Review → Refine → Save → Library → Project
```

## Product promise

- Photoreal and cinematic stills from plain language
- Creative control (style, aspect, camera, lighting) instead of random output
- A saved archive, not a disposable chat generation

Signature system: **Reality Engine** — a simple idea becomes a shot brief you can edit before you generate.

## MVP status

Working now:

| Area | Status |
| --- | --- |
| Landing page | Live |
| Create workspace | Live (image primary) |
| Reality Engine | Live (structured prompt expansion) |
| Results + refine / variation | Live |
| Library | Live |
| Projects | Live |
| Studio | Preview only |
| Enhance | Coming soon |
| Live Imagine / video API | Not connected yet |

Until a generation provider is attached, Forge uses look-development frames so the full save loop can be demonstrated.

## Open the product

```bash
# clone
git clone https://github.com/fategamer/real-forge.git
cd real-forge

# open landing in a browser
open index.html
```

- Landing: `index.html`
- Studio app: `app.html#/create`
- Library: `app.html#/library`
- Projects: `app.html#/projects`

No build step. Static HTML, CSS, and JavaScript.

## Screens

```
/
├── index.html          Landing — FORGE REALITY.
├── app.html#/create    Create workspace
├── app.html#/library   Saved creations
├── app.html#/projects  Project archive
├── app.html#/studio    Studio preview
└── app.html#/settings  Local profile
```

## Stack

- HTML / CSS / vanilla JavaScript
- Client library stored in `localStorage`
- Provider-shaped generation layer (`enhancePrompt`, `generateImage`, `analyzeQuality`) ready for xAI Imagine or another API

## Brand

Dark cinematic UI. Accent `#D6FF3F`. Philosophy: **Idea → Creation → Refinement → Production.**

REAL FORGE does not claim generated frames are undetectable as AI. It aims for high-fidelity, professional-grade stills.

## What is not in this release

Full video editing, audio, billing, team auth, and character-consistency locks. Those wait until one user can enter a sentence and leave with a saved visual — which is the current milestone.

## License

Private product work under [fategamer](https://github.com/fategamer). Ask before reuse.
