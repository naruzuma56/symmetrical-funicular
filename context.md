# Project Context — for AI agents

> Orientation guide for working in this repository. Read before editing. If you keep this file
> up to date as the code changes, future agents (and humans) will thank you.

## 1. What this is

A fully static, single-page **personal portfolio styled like a Japanese manga / comic book**.
The species: a "volume" of 7 chapters (sections), where projects open into a full-screen
**chapter-reader modal** that presents each project as a comic sequence.

- Framework: **React 19** + **Vite 6**
- Language: **TypeScript, strict mode**
- Styling: **Tailwind CSS v4** (CSS-first config via `@tailwindcss/vite`) + a custom manga utility layer
- Animation: **Framer Motion 12**
- Icons: **lucide-react**; class merging: **clsx + tailwind-merge** (`cn`)

All content is **fictional but realistic** placeholder data (persona "Ren Takahashi") meant to be
replaced by the site owner. Domain literals live in `src/data/` and are strongly typed.

## 2. Commands (always run these after changes)

```bash
npm run dev          # dev server (HMR)
npm run typecheck    # tsc -b  — strict; must pass
npm run lint         # eslint 9 flat config; must pass (lint:fix to auto-fix)
npm run build        # typecheck + vite build → dist/
```

Gate = `lint && typecheck && build` all green.

## 3. Repository map

```text
index.html                       # Fonts (Google), meta, #root — no Tailwind here
vite.config.ts                   # react + tailwindcss plugins, es2022 target
tsconfig.*.json                  # references app/node builds; strict on everything
eslint.config.mjs                # flat config; hooks-file override at bottom

src/
  main.tsx                       # createRoot + StrictMode + imports custom-manga.css
  App.tsx                        # Providers → IntroSplash → MangaNav → sections → Footer → ReaderModal
  vite-env.d.ts                  # Vite client types (makes *.svg imports type-safe)

  styles/custom-manga.css        # THE design system (see §4)
  types/index.ts                 # All shared interfaces (see §5)
  lib/utils.ts                   # cn() = twMerge(clsx(...))

  data/                          # Content. Edit these, not components
    profile.ts                   # persona, navItems (7 chapters), socials, profileLinks (as const)
    projects.ts                  # 6 projects incl. full chapters/pages for the reader
    experience.ts                # 4 career entries with `arc`, `accent`
    skills.ts                    # 5 groups (language/framework/database/cloud/design)
    certifications.ts            # 5 entries with S–C ranks

  hooks/
    useAudio.tsx                 # Web-Audio SFX synth + AudioBusProvider (JSX → .tsx!)
    useMousePosition.ts          # MotionValue<number> pointer position
    useReadingDirection.tsx      # LTR/RTL context + ReadingDirectionProvider (JSX → .tsx!)

  components/
    common/    … MangaNav, IngCursor, IntroSplash, KatakanaText, MangaButton, MangaPanel,
                 SectionHeading, SpeechBubble, SpeedLines, Footer
    modal/     > MangaChapterReaderModal.tsx   (the flagship feature)
    sections/  > Hero, About, Experience, Projects, Skills, Certifications, Contact

  assets/      > ink-splash.svg, stamp-seal.svg, badge-ribbon.svg
```

## 4. Design system (read before touching visuals)

Everything visual lives in `src/styles/custom-manga.css`:

- **`@theme` tokens** (Tailwind v4 semantics — they *generate* utilities):
  - Colors → `ink` `#000` · `bone` `#fff` · `paper` `#f4f4f0` · `blood` `#e60012` · `sunny` `#ffe600`
  - Fonts → `font-comic` (Bangers) · `font-pop` (Mochiy Pop One) · `font-body` (Plus Jakarta Sans)
  - Shadows → `shadow-manga`, `shadow-manga-sm/xs/lg`, `shadow-manga-white/blood/sunny`
  - Animations → `animate-float`, `animate-wiggle`, `animate-pop`, `animate-blink`, `animate-stamp`, `animate-spin-slow`
- **Texture utilities** (plain classes in `@layer utilities`):
  - `.halftone` / `-dense` / `-lg` / `-soft` / `-offset` / `-white` / `-fade` (radial-gradient dot fields)
  - `.noise-overlay` (SVG feTurbulence), `.crosshatch`, `.diagonal-stripes*`
  - `.speed-lines-bg` / `-light` (repeating-conic-gradient starburst)
  - `.panel-line`, `.zigzag`, `.inner-shadow-panel`
- **Bubbles**: `.bubble-manga` / `-shout` / `-thought` are `clip-path` polygons. The `SpeechBubble`
  component draws a black wrapper + inset body with the *same* polygon → the ~4px ink rim.
  Moving the polygons? Keep the points inset so the rim stays visible on all edges.
- **Typography**: `.text-outline-black/white`, `.text-shadow-harsh/blood/sunny/white`.
- **Interaction**: `.pressable` (translate + shadow swap on hover/active), `.icon-bounce`.
- `@media (pointer: fine)` hides the native cursor while `.ink-cursor-on` is set (see InkCursor).
- `@media (prefers-reduced-motion: reduce)` kills animation; `@media print` + `.no-print` toggle chrome.

GOTCHA: custom util classes are *not* Tailwind variants (no `hover:halftone`). Combining a custom
background class with Tailwind `bg-*` on the same element is a CSS conflict — pick one (see the
belt background mapping in `Certifications.tsx`).

## 5. Domain model (src/types/index.ts)

```ts
Accent = 'crimson'|'yellow'|'black'|'paper'|'white'   // drives cover/belt/panel tones
ProjectStatus = 'complete'|'in-progress'|'archived'

Project {
  id, slug, title, subtitle, katakana, onomatopoeia,
  description, bullets[], tech[], tags[], status, year,
  coverAccent: Accent, links[], chapters: MangaChapter[]
}

MangaChapter { id, title, chapterNumber, pages: MangaPage[] }
MangaPage    { id, pageNumber, background?, speedLines?, halftone?, panels[] }
MangaPanel   { kind: 'narration'|'dialogue'|'action'|'stats'|'quote',
               text, speaker?, katakana?, align? }

Experience { company, role, arc, period, startYear, endYear, location, summary, achievements[], tech[], onomatopoeia, accent }
Skill      { name, katakana, category, powerLevel (0-100), years }
Certification { name, issuer, year, rank 'S'|'A'|'B'|'C', title, accent, description, credentialUrl? }
NavItem    { id, label, chapter, katakana, anchor }   // must match a <section id=...>
```

Adding a page/panel kind? Update `PanelKind` + the `PanelView` switch in
`components/modal/MangaChapterReaderModal.tsx`.

## 6. Key flows (how it fits together)

**Volume reading direction** — `ReadingDirectionProvider` sets `document.documentElement.dir`
(ltr/rtl) and persists to `localStorage`. Tailwind flex/grid layouts auto-flip. The reader modal
reads `isRtl` to choose slide-offset signs.

**SFX** — `AudioBusProvider` lazily creates one `AudioContext` on first user gesture (autoplay
policies). `useAudio().play(name, { volume? })` synthesizes sounds in-code; no audio files.
Nodes are fire-and-forget (oscillator / noise buffers → gain → destination). Mute persists too.
Note: `ctx.resume()` is called because some browsers create a suspended context.

**Reader modal** (`MangaChapterReaderModal`) — flattens a project into
`[cover, ...chapters.flatMap(ch => [chapterTitle, ...pages])]`. Page turn = `motion.div`
`key={index}` with `AnimatePresence mode="popLayout"`. Body scroll is locked while open;
keyboard map: `Esc` close, `←/→` navigate, `Enter` start on cover.

**Nav** — scroll-spy marks the active chapter; a `useScroll` spring shows reading progress;
`go()` plays the `click` SFX then smooth-scrolls. Hash is also set (deep-linking friendly).

**Projects grid → modal** — `Projects` receives `onOpen` from `App`, which holds
`activeProject` state handed to the reader modal. No data fetching — all static imports.

## 7. Conventions & gotchas

- **`.tsx` vs `.ts`**: any file rendering JSX must be `.tsx`. The two hook files with providers
  are `.tsx` *on purpose*; the ESLint override in `eslint.config.mjs` exempts `src/hooks/**` from
  `react-refresh/only-export-components` for that idiomatic context+provider+hook pattern.
- **Strict TS**: unused locals/params fail the build. Prefix intentionally-unused args `_`.
- **`as const`**: `profile.ts` and data arrays use `as const`; don't widen them into mutable
  arrays or `readonly`-type errors surface in call sites expecting mutable arrays — if you make
  data `readonly`, update the call sites.
- **Framer ease arrays**: use `ease: [...] as const` (tuple typing for motion).
- **clip-path borders**: bubbles keep the wrapper-padding trick; don't add `border-x` to clipped
  elements (the border won't follow the clip).
- **Fonts** load in `index.html` via Google Fonts; offline/hot-plug environments fall back to
  system fonts — don't rely on katakana/Mochiy glyphs being pixel-identical offline.
- **No i18n**: text is a mix of English labels and decorative katakana. Add real i18n only if
  requested — the decorative kana is intentional, not UI copy.
- **IDs/anchors**: `SectionHeading` chapters (`第1話`…) and nav `navItems.anchor` must stay in
  sync with the `<section id=...>` values (`hero|about|experience|projects|skills|certifications|contact`).

## 8. Verification checklist (fire-and-forget smoke test)

An end-to-end Playwright smoke test lives out-of-repo in `/tmp` (not committed). If you make UI
changes, at minimum verify:

1. `npm run lint && npm run typecheck && npm run build` pass.
2. Dev/preview loads without console errors, intro splash dismisses.
3. Reader: cover → flip pages (counter `01/07` advances, `P.xxx` footer updates) → close.
4. Reading-direction toggle flips `document.documentElement.dir`.
5. Contact form blocks on required fields, then shows `SUBMISSION RECEIVED!`.
6. Mobile viewport: burger menu opens the chapter sheet.

## 9. Notes for maintainers

- `dist/` is build output; `.gitignore`d.
- The persona + social links are placeholders — point them at the real owner before going live.
- Anything added to `src/components/`, `src/hooks/`, or `src/data/` should follow the existing
  folder conventions above (one component per file, named exports, `cn()` for classes).