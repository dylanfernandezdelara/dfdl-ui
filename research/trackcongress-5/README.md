# Phase 5: trackcongress before/after

Worktree `../congress-tracker-dfdl` on branch `agent/dfdl-tokens` from `origin/main` (never pushed). Stack: React 18, Tailwind v3.4, Vite 7, its own `--twc-*` HSL-channel tokens and a `DESIGN_LANGUAGE.md`. Driven with the repo's `verify-congress-tracker` skill against the seeded isolated stack (5174/8788).

> Note (2026-09-25): these boards ran with the Lab 2 body/heading size of 15px. The role is now 16px.

## What changed (mapping only, no component edits)

- `web/src/dfdl/tokens.css` and `tokens.hsl.css` copied in; `tokens.hsl.css` is new: the same semantics exported as HSL channel triples for Tailwind v3 (`scripts/color/export-legacy.mts`, now part of `npm run tokens`).
- `web/src/dfdl/map.css` repoints every `--twc-*` at a dfdl semantic, maps the three motion curves and the radius, gives ten heading classes the dfdl heading role in Lora, and adds 0.97 press feedback to every pressable. Lora loaded from Google Fonts in `index.html`.
- `--twc-accent` (which the app had set equal to foreground, "no accent") now points at ember. In practice the app uses the accent in very few places, so the visible accent footprint is small.

## Result

- `qa:web`: 8/8 pass (320/390/1280/1440, light and dark). Nothing clips with 15px Lora headlines replacing 14px sans.
- Boards: `desktop-light.png`, `desktop-light-expanded.png`, `desktop-dark.png`, `mobile.png`. Figma: `dfdl — lab` → page "Phase 5 · trackcongress", before and after side by side.
- Radii already matched dfdl's round family (8 / 12 / 16 / pill). Motion curves were within a hair of dfdl's (`0.16, 1, 0.3, 1` vs `0.23, 1, 0.32, 1`); the sheet curve was identical.

## Ruling (2026-09-24)

Dylan chose sans headings and no accent for trackcongress. Implemented as dfdl **quiet mode** (`<html data-quiet>`), which is now part of the token set. The boards show three columns: before, dfdl full, dfdl quiet (chosen). Warm charcoal dark and the 15px heading role stand.

## Where the two systems disagreed

1. **Typeface.** `DESIGN_LANGUAGE.md` forbids a second family. dfdl puts Lora on every heading. The after shows what that does to a dense feed: row headlines and section titles go serif at 15/550, everything else stays 13px sans.
2. **Accent.** The app removed its orange on purpose; dfdl says one accent for primary action and selection. The app has almost nothing wired to `--twc-accent`, so adopting dfdl fully would mean deciding what the ember touches (active tab underline, selected chamber radio, send button, link underlines).
3. **Dark surface.** The app's dark page is 4% lightness near-black; dfdl's is 17.8% warm charcoal. Visibly softer in the boards.
4. **Text size.** App body 13px = dfdl UI 13px, a clean match. App headline 14 → dfdl heading 15. Page title 24 has no dfdl role between heading 15 and display 32; the header title was mapped to heading.

## Found for a real adoption

- Party colors (R/D/I) are data colors and stayed as they were; they should become dfdl status-style ramps with bg/border/text steps.
- Alpha overlays (`row-hover`, `surface-subtle`) were kept as fg-alpha; dfdl would prefer the opaque `bg-surface-hover` step so hover reads the same on any surface.
- The `[data-theme="dark"]` switch differs from dfdl's `.dark`; the mapping mirrors the non-HSL dark values by hand. A real adoption would standardize on one.
