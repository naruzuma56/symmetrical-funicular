# 武 Ren Takahashi — Manga Portfolio

A production-ready, highly interactive personal portfolio rendered in the visual language of a Japanese manga / comic book. Every section reads like a new chapter of a volume: covers, halftone shading, katakana onomatopoeia, jagged speech bubbles, speed lines, and a chapter-reader modal that turns each project into a readable comic sequence.

Built with **React 18+** (19), **Vite**, **TypeScript** (strict), **Tailwind CSS v4**, **Framer Motion**, and **Lucide**.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [Customization](#customization)
- [Accessibility & performance](#accessibility--performance)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- **Manga-first design language** — monochrome ink/paper palette with crimson `#E60012` and electric-yellow `#FFE600` accents, halftone dots, noise, crosshatching, diagonal stripes, and hard drop shadows (`8px 8px 0 #000`).
- **Chapter-reader modal** — each project is opened as a manga volume cover and read page-by-page with keyboard navigation, page-turn transitions, and synthesized SFX.
- **Sound effects** — zero audio assets: a small Web-Audio synth engine generates `click`, `pop`, `page`, `whoosh`, `stamp`, `thud`, and `powerup` sounds, with a global mute toggle.
- **Reading direction** — toggle between Western (L→R) and manga (R→L) reading order; the preference persists in `localStorage` and flips the page layout.
- **Ink cursor** — brush-and-ink pointer trail (spring-physics, `mix-blend-difference`) on fine-pointer devices, with hover detection for interactive elements.
- **7 interactive sections** — Cover/Hero, About, Battle Record (experience), Works (projects), Techniques (skills gauges), Titles (certifications), and Transmission (contact form).
- **Comic navigation** — sticky header with chapter labels (`第1話 … 第7話`), scroll-spy active states, reading-progress gauge, and a mobile chapter sheet.
- **Fully typed data layer** — all content lives in typed datasets, so adding a project or skill never requires touching components.

---

## Tech stack

| Layer            | Choice                                                        |
| ---------------- | ------------------------------------------------------------- |
| Framework        | React 19 (18+ compatible) via Vite 6                          |
| Language         | TypeScript 5.8 (strict, `noUnusedLocals`, `verbatimModuleSyntax`) |
| Styling          | Tailwind CSS v4 (`@tailwindcss/vite`) + custom manga CSS      |
| Animation        | Framer Motion 12 (panels, page turns, floating keyframes)     |
| Icons            | Lucide React                                                  |
| Class utilities  | `clsx` + `tailwind-merge` (`cn`)                              |
| Lint / QA        | ESLint 9 (flat config) + `typescript-eslint`, `tsc --noEmit`  |
| Fonts            | Google Fonts: Bangers, Mochiy Pop One, Plus Jakarta Sans      |

---

## Getting started

Prerequisites: **Node.js ≥ 20** and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open the printed URL (default `http://localhost:5173`). For a production preview:

```bash
npm run build
npm run preview
```

---

## Scripts

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Start the Vite dev server with HMR.               |
| `npm run build`      | Type-check (`tsc -b`) then produce `dist/`.       |
| `npm run preview`    | Serve the production build locally.               |
| `npm run typecheck`  | Run the TypeScript project build / strict check.  |
| `npm run lint`       | ESLint on all `ts`/`tsx` sources.                 |
| `npm run lint:fix`   | Auto-fix lint findings.                           |

---

## Project structure

```text
src/
├── assets/                    # Inline SVG textures & badges
│   ├── ink-splash.svg         # Brush splash for the hero portrait
│   ├── stamp-seal.svg         # Red hanko seal (nav + footer + hero)
│   └── badge-ribbon.svg       # Comic ribbon accent (unused decoration)
├── components/
│   ├── common/                # Reusable manga primitives
│   │   ├── Footer.tsx
│   │   ├── InkCursor.tsx
│   │   ├── IntroSplash.tsx    # "VOL.1 IS BEING PRINTED" cover-load
│   │   ├── KatakanaText.tsx   # オノマトペ sound-effect text
│   │   ├── MangaButton.tsx    # Comic CTA (skewed, hard shadow, SFX)
│   │   ├── MangaNav.tsx       # Sticky chapter nav + scroll progress
│   │   ├── MangaPanel.tsx     # Framed panel with textures
│   │   ├── SectionHeading.tsx # Chapter titles (第X話)
│   │   ├── SpeechBubble.tsx   # manga / shout / thought bubbles
│   │   └── SpeedLines.tsx     # Radiating SVG action lines
│   ├── modal/
│   │   └── MangaChapterReaderModal.tsx  # Per-project volume reader
│   └── sections/              # Hero, About, Experience, Projects,
│                              # Skills, Certifications, Contact
├── data/                      # Strongly typed content (edit here)
│   ├── profile.ts             # Persona, nav chapters, socials
│   ├── projects.ts            # Six projects incl. full chapters/pages
│   ├── experience.ts          # Career "battle disks"
│   ├── skills.ts              # Power gauges grouped by category
│   └── certifications.ts      # S–C rank seals
├── hooks/
│   ├── useAudio.tsx           # Web-Audio SFX engine + provider
│   ├── useMousePosition.ts    # Motion-value pointer tracking
│   └── useReadingDirection.tsx# LTR/RTL reading-order context
├── lib/
│   └── utils.ts               # `cn()` (clsx + tailwind-merge)
├── styles/
│   └── custom-manga.css       # Tailwind v4 @theme + manga utilities
├── types/
│   └── index.ts               # Project, Experience, Skill, MangaPage…
├── App.tsx                    # Providers + section composition
├── main.tsx                   # React root / entry
└── vite-env.d.ts              # Vite client types (SVG imports)
```

---

## Design system

The entire manga language is defined in [`src/styles/custom-manga.css`](src/styles/custom-manga.css):

- **Tokens** (`@theme`) — color (`--color-ink/bone/paper/blood/sunny`), fonts (`--font-comic/pop/body`), shadows (`--shadow-manga*`), and animations (`--animate-float/wiggle/pop/stamp/…`).
- **Texture utilities** — `.halftone`, `.halftone-dense`, `.halftone-offset`, `.halftone-white`, `.noise-overlay`, `.crosshatch`, `.diagonal-stripes`, `.speed-lines-bg` (conic rays).
- **Bubbles** — `.bubble-manga`, `.bubble-shout`, `.bubble-thought` `clip-path` polygons; the black wrapper + inset body produce the ink rim.
- **Type** — `.text-outline-black/white`, `.text-shadow-harsh`, and Bangers/Mochiy Pop One display faces.
- **Motion** — respects `prefers-reduced-motion`; comic scrollbar; print stylesheet strips interactive chrome (`no-print`).

### Katakana glossary

| Onomatopoeia | Meaning / use                 |
| ------------ | ----------------------------- |
| ゴゴゴ (gogogo) | Menacing tension (floating FX) |
| ドドド (dododo) | Heavy action / impact          |
| ズバッ (zubaa)  | Clean slice / decisive blow    |
| サクッ / パラッ  | Swift, crisp actions           |
| ムサシ / 闇夜   | Decorative watermarks          |

---

## Customization

All content lives in `src/data/` and is strongly typed via `src/types/index.ts`.

**Add a project**

1. Create a `Project` object in `src/data/projects.ts`.
2. Give it `chapters` (each with `pages` and `panels`) — these drive the reader modal.
3. It appears automatically on the Works grid; clicking the cover opens its volume.

**Add a skill / certification / job** — append an object to the matching dataset. No component changes required.

**Tune the theme** — edit the `@theme` block in `custom-manga.css`. New color/font tokens are automatically available as Tailwind classes (e.g. `bg-sunny`, `font-comic`).

**Persona** — update `src/data/profile.ts` (name, epithet, tagline, availability, links, nav chapters).

> **Note:** `src/hooks/useAudio.tsx` and `useReadingDirection.tsx` use the `.tsx` extension because they render JSX providers. Keep that suffix when extending them.

---

## Accessibility & performance

- Semantic landmarks (`header`, `main`, `footer`, `section[id]`), `aria-label`s on icon-only controls, a `role="dialog"` reader, focus styles on `focus-visible`.
- Keyboard support in the reader (arrow keys, `Enter` on the cover, `Escape` closes).
- `prefers-reduced-motion` disables decorative animation.
- The ink cursor is additive (native cursor remains behind it) and only activates on `(pointer: fine)` devices.
- Production build ~141 kB gzipped JS / ~9 kB CSS; fonts are fetched from Google Fonts with graceful system fallbacks.

---

## Deployment

`npm run build` emits a static bundle in `dist/` — deployable to any static host:

- **Netlify / Vercel** — build command `npm run build`, output `dist`.
- **GitHub Pages** — set `base` in `vite.config.ts` if hosting from a sub-path.
- **Any CDN / NGINX** — upload `dist/` and serve `index.html` as the fallback for SPA routing if you enable history routing.

---

## License

All design assets, prose, and code are original to this portfolio unless noted otherwise. Swap the fictional persona content in `src/data/profile.ts` before reuse.