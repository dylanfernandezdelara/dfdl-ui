# dfdl-ui

Dylan's design standard as an installable package: tokens, components, a skill, a lint policy, and a Figma library. Read `PLAN.md` for status and phases, `decisions.md` for every approved value and why, `research/` for the audit behind them.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` (port 3000; use `-- --port 3100` if 3000 is taken) |
| Lint (ESLint + `@shadcn/lint` policy) | `npm run lint` |
| Typecheck | `npm run typecheck` (needs `.next/types`; run `dev` or `build` once first) |
| Both | `npm run check` |
| Build | `npm run build` |

After making changes, run `npm run check` and fix all errors. The design-system lint errors carry their own fix instructions.

## Stack

Next 16 (App Router, Turbopack), React 19, Tailwind v4, Base UI via shadcn (`base-nova` preset), Lucide icons, Lora + Geist Mono via `next/font`, system sans body. Next 16 has breaking changes versus training data; read `node_modules/next/dist/docs/` before using an unfamiliar API.

## Where things live

| Path | What |
| --- | --- |
| `src/styles/tokens.css` | The single source of truth for values. Primitives (by hue and step) and semantics (by role), light and dark. Never used directly in components; `globals.css` exposes semantics as Tailwind utilities. |
| `src/app/globals.css` | Tailwind `@theme` surface for the tokens, shadcn compatibility aliases, motion utilities (`duration-fast`, `transition-interactive`, `transition-icon`, `press`). |
| `src/components/ui/` | Registry components (`@dfdl/*`). Empty until Phase 7. |
| `src/components/layout-grid/` | 8/24 baseline grid overlay. Toggle with `g`, the corner button, or `?grid=1`. |
| `src/app/lab/` | Labs where foundations are decided. Each lab shows Dylan's current values beside two alternatives. |
| `src/styles/tokens.hsl.css` | Generated. The same semantics as HSL channel triples for Tailwind v3 consumers (`hsl(var(--hsl-bg-page) / <alpha-value>)`). `npm run tokens` regenerates everything. |
| `design-system.lint.json` | The `@shadcn/lint` policy. Consumers extend it. Contracts are added per component. |
| `.agents/skills/` | Vendored reference skills (Emil, Jakub, Figma). Hand off to them; never copy their rules into the dfdl skill. |
| `skills/dfdl-ui/` | The dfdl skill (not yet written; drafted after Phase 5 from `decisions.md`). |
| `research/` | Audits and standards research. |

## Rules

- Use semantic utilities only: `bg-surface`, `text-fg-secondary`, `border-line`, `bg-accent-solid`, `elevation-raised`. The full list is at the top of `globals.css`. No Tailwind palette colors, no arbitrary values, no primitives in components. The linter enforces this.
- Data-dense products (color already carries data, headlines stack in lists) run in quiet mode: `<html data-quiet>`. Headings go sans and the accent collapses into the neutrals; everything else is unchanged. trackcongress is the reference consumer.
- The accent is chosen once per product: `<html data-accent="ember">` (default) or `indigo`. Never mix accents inside one product; add a third only with a decision in `decisions.md`.
- `text-primary` is shadcn's name for the accent fill, kept only so stock components render. Body text is `text-fg`.
- Source tokens in `tokens.css` (`--bg-*`, `--fg-*`, `--border-*`, `--rounded-*`, `--motion-*`, `--elevation-*`) never share a name with a Tailwind theme key (`--color-*`, `--radius-*`, `--ease-*`, `--shadow-*`). A shared name compiles to a self-referential variable; check compiled CSS, not the source, when in doubt.
- Type is set with role utilities: `text-display`, `text-title`, `text-heading`, `text-body`, `text-ui`, `text-caption` (each carries size, leading and weight). Never combine `text-sm` with `leading-*` by hand.
- `cn` (`src/lib/utils.ts`) is configured with the dfdl vocabulary so custom `text-<role>`, `font-<family>`, elevation and motion classes merge correctly. Add any new custom utility there too, or a later `text-fg` will silently drop it.
- Everything lands on the 8/24 grid. Check with `g`.
- Shadows are `elevation-raised` / `elevation-floating` utilities (convention; `@shadcn/lint` 0.1.0 misread `shadow-<name>` as a color, fixed in 0.2.0, but the names stayed).
- Transition only what changes: `transition-interactive` for controls, `transition-icon` for icon swaps. Never `transition-all`. Press feedback is `press` (scale `var(--press-scale)`).
- Reduced motion is handled per component (keep opacity and color, drop movement). There is no blanket kill switch.
- Motion is verified in the browser, at 10% speed, with `document.getAnimations()` after the interaction, not by reading CSS.
- Every accepted correction lands in the narrowest holder: linter if mechanical, skill if judgment, `decisions.md` always. Update `PLAN.md` status in the same commit as the work.
- Interim values (motion curves, radius, the neutral ramp) are marked in `tokens.css` and `decisions.md`; do not treat them as final before their lab.

## Figma

Remote MCP is connected in Devin CLI at user scope (`figma`). Work only in the `DFDL Studio` team (Pro, Full seat). Agents write to `dfdl — scratch`, never the published `dfdl` library. Do not add Figma's desktop server (`127.0.0.1:3845`) to the CLI; it shadows the remote write tools. Load `figma-use` before any `use_figma` call. Lab captures live in `dfdl — lab` (`slkV1ZgOSG2hBKNI3dBsU5`). To push a page: `generate_figma_design` for a capture id, open `http://localhost:<port>/<route>#figmacapture=<id>&figmaendpoint=<encoded endpoint>&figmadelay=2500` in agent-browser (the capture script is already in the dev layout), then poll. Set `localStorage.theme` before opening to capture dark.

## Git

Commit and push to `main` at the end of every phase, lab, and component. No force pushes, no history rewrites. Nothing is pushed to any other repository from this project.
