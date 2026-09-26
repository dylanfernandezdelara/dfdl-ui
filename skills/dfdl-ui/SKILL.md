---
name: dfdl-ui
description: Build or restyle UI in Dylan Fernandez de Lara's products (dylanfdl.com, trackcongress, Fork, new apps) with the dfdl design system. Use for any component, page, layout, color, type, spacing or motion work in a project that uses dfdl tokens (styles/dfdl/tokens.css, data-accent on <html>), or when asked to make something "look like Dylan's".
---

# dfdl ui

Dylan's design system: tokens, React components on Base UI, a lint policy, and probes that measure the result.
Docs: https://dfdl-ui.fernandezdelaradylan.workers.dev · Plain text for agents: /llms.txt · Source: github.com/dylanfernandezdelara/dfdl-ui

The feel, in one line: warm and quiet. One neutral family, one accent, a Lora title over small sans prose, round corners, motion you do not notice, everything on an 8px grid.
If a screen looks like a competent generic dashboard, it is wrong.

## Before you write UI

1. Check the project has dfdl: `styles/dfdl/tokens.css` and `styles/dfdl/theme.css` imported from the global CSS, and `data-accent` on `<html>`. If not, install it (see Setup) before anything else.
2. Look for an existing component. Never hand-build something the registry has:

| Need | Component | Add |
| --- | --- | --- |
| Action | Button (`primary` `secondary` `ghost` `danger`; `sm` 28, `md` 32, `lg` 40, `icon`) | `button` |
| Status label | Badge | `badge` |
| Grouped content | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter | `card` |
| Decision that interrupts | Dialog | `dialog` |
| Text field | Input | `input` |
| Shortcut | Kbd | `kbd` |
| List of actions | Menu | `menu` |
| One of a few, all visible | SegmentedControl | `segmented-control` |
| Setting on/off | Switch | `switch` |
| Views in one place | Tabs | `tabs` |
| Label for an icon-only control | Tooltip | `tooltip` |

   `npx shadcn@latest add https://dfdl-ui.fernandezdelaradylan.workers.dev/r/<name>.json`

   If the registry lacks it, build on the matching Base UI part and follow "Adopt a component" below.

## Setup (once per project)

```bash
npx shadcn@latest add https://dfdl-ui.fernandezdelaradylan.workers.dev/r/theme.json
```

Replace the global CSS with these imports. shadcn init's own theme block overrides page color and radius if it stays.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "../styles/dfdl/tokens.css";
@import "../styles/dfdl/theme.css";
@import "../styles/dfdl/base.css";
```

In an existing app, import `tokens.css` and `theme.css` after Tailwind and before the app's own `@theme`, and skip `base.css` (page defaults: body color, focus ring, `dark:` on `.dark`). The components do not depend on it.

Add the probes the Verify steps use (they land in `scripts/probes/`):

```bash
npx shadcn@latest add https://dfdl-ui.fernandezdelaradylan.workers.dev/r/probes.json
```

On a Tailwind v3 site, upgrade to v4 first in its own PR: `@tailwindcss/upgrade` for the config and renames, but keep the site's component CSS as plain CSS in `@layer components` (the tool's `@utility` conversion silently drops class names built at runtime), and pixel-diff screenshots against the v3 build before claiming no visual change.

Load Lora with next/font as `--font-lora`. Set `<html data-accent="ember">` (default) or `"indigo"` for products that already own blue. Tailwind v3 projects use the `tokens` item and `tokens.hsl.css` instead.

## Values

Use utilities, never raw values. The linter rejects palette colors, arbitrary values, inline styles and restyled components.

- **Surfaces:** `bg-page` `bg-subtle` `bg-surface` `bg-surface-hover` `bg-surface-active` `bg-sunken` `bg-raised` `bg-overlay`
- **Text:** `text-fg` (body) `text-fg-secondary` `text-fg-tertiary` `text-fg-strong` (headings) `text-fg-on-accent`. `text-primary` is shadcn's accent fill, never body text.
- **Lines:** `hairline` `hairline-t` `hairline-b` `hairline-r` (shadows, take no space), `border-line` only where the box already accounts for 1px.
- **Accent:** `bg-accent-solid` `bg-accent-bg` `text-accent-text` `border-accent-border`. **Status:** `bg-danger` `bg-danger-bg` `text-danger-text`, same for `success`, `warning`.
- **Depth:** `elevation-raised` (cards, secondary buttons), `elevation-floating` (menus, dialogs).
- **Type roles:** `text-headline` 28/32 (article title) and `text-display` 24/32 (page title), both with `font-display` (Lora); `text-title` 20/32 and `text-heading` 17/24 at 600 in sans (section and sub-section headings, card and dialog titles); `text-body` 14/24 at 450 (page prose, the default); `text-reading` 15/24 (long-form articles); `text-ui` 14/20 at 450; `text-caption` 12/16. Never a size class plus a leading class.
- **Radius:** `rounded-xs` 8 (chips), `rounded-sm` 10 (controls), `rounded-md` 12 (fields, popovers), `rounded-lg` 16 (cards), `rounded-xl` 24 (sheets). Nested corners: inner = outer − padding.
- **Space:** `gap-minor`/`p-minor` 8, `gap-major`/`p-major` 24. Control heights 24, 28, 32 (default), 40, 48.
- **Motion:** `transition-interactive` for controls, `transition-icon` for icon swaps, `press` for press feedback, `duration-fast` (150) and friends, `ease-out`. Popups use `motion-pop`, `motion-dialog`, `motion-tooltip`, `motion-fade`.

## Judgment (what the linter cannot check)

- **One primary button per view.** The accent marks the primary action and the current selection, nothing else: no accent headings, icons or decorative fills.
- **Lora is for titles only.** The page title (`text-display`) and an article title (`text-headline`). Headings are sans at 600 and step down by size.
- **Text size is 14, not 16.** Page prose is `text-body` (14/24). Use `text-reading` (15) only for long-form articles. Do not bump prose to 16 because it "looks small" in isolation; 14/24 at weight 450 is the measured size of Dylan's site.
- **Inline boxes sit on the baseline.** A word with its own box inside a sentence (an animated word, a badge, a kbd) uses `vertical-align: baseline`. `text-bottom` or `middle` leave an offset that is invisible at one size and a visible pixel at the next. Never give such a box `overflow: hidden` or `clip`: Safari then takes its baseline from the bottom edge and lifts the text by its descender. Mask with `clip-path` instead.
- **Quiet mode** (`<html data-quiet>`) for data-dense products where color already carries data: titles go sans, the accent collapses into the neutrals. trackcongress runs quiet.
- **Density:** 32px controls by default; 28 (`size="sm"`) in dense rows and tables; 40 for touch-first surfaces.
- **Should it animate?** Not if it is keyboard-triggered or happens hundreds of times a day. Hover and press are near-imperceptible. Menus, dialogs and drawers get the standard treatment. If you can describe the animation, it is too much.
- **Copy:** short and plain. One line per description. No marketing voice, no mono or uppercase labels for decoration.
- **Warmth:** never pure white or pure black; the neutrals already carry the warmth. Do not add tints.

## Verify (every UI change)

1. `npm run lint`. Zero errors; each message says what to use instead.
2. Grid: run `scripts/probes/grid.js` in the page (`agent-browser eval "$(cat scripts/probes/grid.js)"`) and fix until offenders are 0. One 2px slip shifts every row below it; fix the first cause.
3. Baseline: run `scripts/probes/baseline.js` on any page with inline boxes in running text, in Chromium and in WebKit (Playwright's `webkit`; engines disagree on inline baselines). Zero offenders; half a pixel counts. Dylan uses Safari: a Chromium-only check is not a check.
4. Motion: trigger the interaction, then read `document.getAnimations()` (`scripts/probes/animations.js`). Check property, duration and curve against the spec. Reading the CSS is not proof.
5. Look at it in light and dark, and at 390px wide with no horizontal scroll.
6. Restyling an existing product: measure its rendered text first (`getComputedStyle` on the paragraphs, never on `<body>`) and compare after. A size that changes by more than a pixel needs Dylan's sign-off.

## Adopt a component

1. Bring the source in (a shadcn registry URL, or copy), on Base UI if it has a matching part.
2. Retoken every color, radius, space and motion value until the linter is quiet.
3. Add a height contract in `design-system.lint.json` if it is a control.
4. Motion spec: curve, duration, exit at 75%, reduced motion keeps opacity and drops movement. Verify with the probe.
5. Registry item with dependencies; docs page with every state.

## Never

Pure white or black surfaces · a second accent in one product · `transition: all` · `ease-in` · animating width, height, top or left · a size between roles · unitless line-heights · a border that pushes content off the grid · a value that is not a token.

## Hand-offs

For deeper craft, load the vendored skills by name rather than restating them: `emil-design-eng` and `animate` (motion), `better-typography`, `better-colors`, `better-layout`, `better-accessibility`. Where they disagree with this skill, dfdl wins; the reason is in `decisions.md`.
