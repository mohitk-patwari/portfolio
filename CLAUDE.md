# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build + type-check
npm run lint     # ESLint via Next.js
npx tsc --noEmit # type-check only, no emit
```

There is no test suite. There are pre-existing TypeScript errors in three legacy files (`CircuitBackground.tsx`, `ConstellationSkills.tsx`, `useScrambleText.ts`) that are **not introduced by new work** — filter them out when checking for regressions:

```bash
npx tsc --noEmit 2>&1 | grep -v "CircuitBackground\|ConstellationSkills\|useScrambleText\|CircuitTraces"
```

## Stack

- **Next.js 14** — Pages Router (not App Router). All pages live in `pages/`. No `app/` directory.
- **TypeScript strict** — `tsconfig.json` has `strict: true` and `jsxImportSource: "react"`. Do **not** use `<style jsx>` — it requires styled-jsx types not present here.
- **Tailwind CSS** — config in `tailwind.config.js`. Custom tokens extend the theme.
- **Framer Motion** — for entrance animations, `AnimatePresence`, and layout transitions.
- **anime.js v4** — for scroll-driven and procedural animations. Always use the v4 import:
  ```ts
  import { animate, createScope, createDrawable, onScroll, stagger } from 'animejs'
  ```
  Never use `anime()` (v3 API) or default import.

## Design System

### Color tokens (Tailwind names → hex)
| Token | Hex | Role |
|-------|-----|------|
| `sapphire` | `#0a1628` | page background |
| `royal` | `#0d2d52` | card / surface |
| `glow` | `#122a4a` | hover surface |
| `lemon` | `#e6d44a` | primary accent |
| `tealcyber` | `#3dd6c8` | cyber accent |
| `rust` | `#c9593a` | warmth, sparingly |
| `butter` | `#f0e6c8` | body text |
| `borderline` | `#1e4976` | structural borders |

Always reference colors by Tailwind token name, never raw hex (except inside SVG `fill`/`stroke` attributes where Tailwind classes don't apply).

### Fonts
- `font-display` → Orbitron (headings, logo)
- `font-mono` → JetBrains Mono (code, labels, monospaced UI)
- `font-body` → Inter (body copy)

### Global CSS patterns (`styles/globals.css`)
- `.mono-label` — tiny uppercase mono label above headings (`// SECTION_NAME` style)
- `.section` — standard section padding (`pt-28 pb-20`)
- `.glow-lemon`, `.glow-teal`, `.glow-rust` — text-shadow glow utilities
- `.glow-box-teal`, `.glow-box-lemon` — box-shadow glow utilities
- `.cyber-focus` — keyboard focus ring style
- `.section-bg-dots/lines/grid/diagonal` — per-section background textures
- `.section-panel-top` — gradient top border for section wrappers (via `::before`)
- `.ticker-track` — infinite scrolling horizontal marquee
- Grain and scanline overlays are injected in `pages/_document.tsx` as DOM nodes, not CSS classes on `<body>`.

## Architecture

### Page structure
Single-page portfolio. `pages/index.tsx` assembles all sections in order:

```
_document.tsx  →  grain + scanline overlays, font links
_app.tsx       →  ThemeProvider (dark only) + Preloader (first visit only)
index.tsx      →  NavDrawer + Navbar + <main>
                    Hero
                    ticker strip
                    CircuitTraces
                    [section-bg-dots] About
                    CircuitTraces
                    [section-bg-lines] Education
                    CircuitTraces
                    [section-bg-grid] Skills
                    CircuitTraces
                    [section-bg-diagonal] Projects
```

`CircuitTraces` is a decorative SVG divider placed between every section pair. It draws on scroll using anime.js `createDrawable`.

### Navigation system (two components, one z-axis layer apart)
- **`Navbar.tsx`** (`z-50`) — floating pill, desktop-only nav links, IntersectionObserver tracks the active section. No mobile hamburger.
- **`NavDrawer.tsx`** (`z-[140]`, hamburger at `z-[150]`) — hamburger fixed top-left, always visible. Fullscreen overlay slides down from top. Staggered Orbitron links. Uses `Logo variant="full"` in bottom-left.

Both components define their own `navItems` array independently (intentional duplication).

### Preloader
`components/Preloader.tsx` wired into `pages/_app.tsx`. Checks `sessionStorage.getItem("preloader_seen")` — shows once per tab session. Key SSR patterns used:
- Quote selected in `useEffect` (not `useMemo`) to avoid hydration mismatch from `Math.random()`
- Timer uses `useRef` for the callback to avoid re-firing when parent re-renders

### Section heading pattern
**All section headings** use this exact pattern — never `SectionHeader` (legacy, rejected):
```tsx
<p className="mono-label">// SECTION_LABEL</p>
<GlitchText
  text="Heading"
  as="h2"
  className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2"
  scrambleOnHover={true}
  animDelay={100}
  scrambleDuration={600}
/>
```

### `GlitchText` component
Combines `useScrambleText` hook (character scramble on mount or hover) with an anime.js entrance animation (opacity + y slide) and a CSS `::before` pseudo-element glitch clip. Accepts `as="h1"|"h2"|"h3"|"span"`. Does **not** accept an `id` prop — wrap in a `<div id="...">` if needed for `aria-labelledby`.

### `Logo` component
Pure SVG, no font dependency. Three variants:
- `"mark"` — 28×28 targeting reticle symbol (used in Navbar)
- `"wordmark"` — 106×24 MOHIT in geometric strokes
- `"full"` — symbol + wordmark side by side (used in NavDrawer)

### `CharacterIllustration` component
280×520 SVG built from polygon/rect/polyline/circle primitives only (no curves). Color palette is intentionally different from the site palette — amber `#FF9F1C`, cyan `#00F0FF`, lime `#39FF14` — to make it pop against the dark background. Rendered in Hero's right column, hidden below `lg` breakpoint.

### `Skills` component
HUD Equipment Manifest design. Signal bars animate via `IntersectionObserver` + CSS `transition` (not anime.js). The `animate` import from animejs is present but not used for the bars — CSS transition handles it. `experimental` flag on a category adds a `⚠ WARNING` banner.

### `Projects` / `ProjectCard`
Six projects, no `imageSrc` — each card renders a terminal-art thumbnail via `terminalLines: { text: string; type: "cmd" | "out" }[]`. The `type` field controls text color (tealcyber for commands, butter for output).

## Rejected patterns — never reintroduce
- `SectionHeader` component
- `CornerBracket` component (corner bracket decorations on headings)
- `ConstellationSkills` / hexagon skill visualization
- Light mode (dark is always default and only mode; `enableSystem={false}`)
- "Full-stack developer" identity label (it's "Engineer & Builder")
- Coffee references (it's tea: `🍵`)
- `<style jsx>` blocks (not configured, causes TS errors)
- anime.js v3 default import `anime({})`

## Legacy / dead files
These files exist but are not imported anywhere active:
- `components/ThemeToggle.tsx`
- `components/CornerBracket.tsx`
- `components/SectionHeader.tsx`
- `components/CircuitBackground.tsx`
- `components/ConstellationSkills.tsx`

Do not delete without checking git history for context; do not introduce new imports of these files.
