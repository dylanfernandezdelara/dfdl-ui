# Phase 5: dylanfdl.com before/after

Worktree `../dylanfdl_website-dfdl` on branch `agent/dfdl-tokens` from `origin/main`. **Not pushed, no PR.** Dylan reviews the boards before anything moves. Stack: Next 15, React 19, Tailwind v3.4 (not v4 as first assumed), full-color CSS variables (`--bg0..4`, `--fg0..4`, gruvbox-ish hues, shadcn aliases, `--article-*` scoped to `.article-shell`).

> Note (2026-09-25): these boards ran with the Lab 2 body/heading size of 15px. Body is now 14/24 at 450 (page prose) and reading 15/24 (articles), measured from dylanfdl.com; see decisions.md, Type sizes (measured).

## What changed (mapping only, no component edits)

`src/styles/dfdl/tokens.css` copied in; `src/styles/dfdl/map.css` loaded last:

- Surfaces `bg0..bg4` → `bg-page / bg-subtle / bg-surface-hover / bg-surface-active / border-subtle`. Text `fg0..fg4` → `fg-strong / fg / fg / fg-secondary / fg-tertiary`.
- `blue` (links) → `accent-text`; `aqua` (link hover) and `orange` → `accent-solid`; `red/green/yellow` → status ramps. Purple, aqua-as-data, gray untouched.
- `--radius` 8px → `rounded-sm` 10px; popover → `bg-raised`; shadow → `elevation-floating`.
- Article roles, scoped to `.article-shell`: body 15/24, title 32 display, h2 title role, h3 heading role (both 15/550 Lora), motion curve and durations to tokens.
- Tailwind v3 size classes the site uses (`text-2xl`, `text-lg`, `text-base`, `text-sm`, `text-xs`) moved onto the dfdl roles.
- Press feedback (0.97 at 150ms) on pressables; reduced motion drops the scale.

## Result

- `npm run check`: lint, typecheck, 234 tests pass on the branch.
- Verified in the browser: h1 Lora 32, article h2 Lora 15/550, body 15/24.
- Boards: `light-home.png`, `light-article.png`, `dark-home.png`, `dark-article.png`, `light-contact.png`, `mobile.png`. Figma: `dfdl — lab` → page "Phase 5 · dylanfdl", article before and after side by side.

## What to look at

1. **Text temperature.** The site had warm cream surfaces with cool slate text; now text and surfaces share one warm family. Most visible in the article body.
2. **Weight-led headings.** Article h2/h3 drop from 20/17px bold sans to 15px Lora at 550. This is the biggest change and the one you chose in Lab 2; read the article board and decide whether it holds at real length.
3. **Dark surface.** Slightly lighter and warmer charcoal than before.
4. **Radius** 8 → 10 on controls (segmented filter, buttons).
5. **The "optimist" word** keeps its own animated color and is unaffected.

## Found for a real adoption

- The site's `--article-*` variables already form a type-role layer; a real adoption would point them at dfdl roles in `shell.css` and delete the mapping file.
- `text-2xl` etc. overrides are a stopgap; the real version uses dfdl role utilities once the site is on Tailwind v4.
- Link underline color and the accent on the tab indicator are the only places ember appears; the site is nearly quiet-mode by nature, which is right for a portfolio.

## Grid audit (scripts/probes/grid.js) on the retokened site

- Home: 72 of 101 blocks off the 4px grid, almost all inside the animated "optimist" word (char slots at fractional tops; by design) and the card grid.
- Article: header row lands at top 98 (2px off); TOC label uses unitless `line-height: 1.4` (16.8px); TOC list height fractional. Small, real, and exactly the class of defect the audit exists for. Fix list for the real adoption.
