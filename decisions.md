# Decisions

Every value Dylan approved, with the alternatives it was chosen against and one line of why. Append in the same commit as the change. The `dfdl-ui` skill is written from this file, so an entry here is the source; the skill restates it.

Format: `date · area · decision · chosen against · why · status`

Status is `approved`, `interim` (in use but not yet reviewed in its own lab), or `superseded` (with a pointer to the newer entry).

## Foundations

| Date | Area | Decision | Chosen against | Why | Status |
| --- | --- | --- | --- | --- | --- |
| 2026-09-15 | Color model | OKLCH for all tokens, sRGB hex fallbacks generated, two tiers (primitives by hue and step, semantics by role) | HSL, hand-picked hex | Perceptual uniformity makes matched-lightness comparison and predictable ramps possible; matches dylanfdl.com's existing approach | approved |
| 2026-09-15 | Token naming | Semantics `--bg-*`, `--fg-*`, `--border-*`, `--accent-*`, `--status-*`, `--rounded-*`, `--motion-*`, `--elevation-*`; utilities `text-fg`, `border-line`, `bg-accent-solid`. `fg` is the one word for foreground; `primary` is reserved for shadcn compatibility and never means body text | `--color-text-primary` (collides with shadcn `primary` and with Tailwind theme keys) | Jakub's one-word rule; Tailwind theme keys must differ from source names or they compile self-referentially | approved |
| 2026-09-15 | Grid | 8px minor, 24px major rhythm with overlay | none considered | Already proven on dylanfdl.com; overlay ported as is | approved |
| 2026-09-15 | Type families | System sans body, Lora display and emphasis, Geist Mono code and metadata | Geist everywhere, Inter + serif | Continuity with dylanfdl.com; zero font cost for body | approved |
| 2026-09-15 | Motion, interim | `cubic-bezier(0.23, 1, 0.32, 1)`, 150ms hover, `scale(0.97)` press | none yet | Emil's defaults so labs 1 and 2 do not feel broken before the motion lab | interim |

## Architecture

| Date | Area | Decision | Chosen against | Why | Status |
| --- | --- | --- | --- | --- | --- |
| 2026-09-15 | Primitives | Base UI + Tailwind v4 | Radix, plain CSS | Where shadcn and Kitze moved; Fork already uses it | approved |
| 2026-09-15 | Motion library | CSS-first; `motion` only in expressive and AI components that need springs | motion everywhere, CSS only | Core stays dependency-free; per-item registry deps keep heavy pieces out of `button` | approved |
| 2026-09-15 | Distribution | shadcn registry, `@dfdl` namespace, `registry:base` preset | npm package | Source lands in the consumer project; adoption of outside components is copy and retoken | approved |
| 2026-09-15 | Agent guidance | One `dfdl-ui` skill that hands off to Emil, Jakub and Figma skills by name | Google `DESIGN.md`, copying reference skills | Skills are the spec with a validator and measured effect; a values file alone moved nothing in any published test | approved |
| 2026-09-15 | Enforcement | `@shadcn/lint`: no raw colors, no arbitrary values, per-component contracts | prose rules only | Mechanical rules belong in a linter; agents reach zero violations in one round in shadcn's evals | approved |
| 2026-09-15 | Figma to code mapping | `dfdl/X` component naming plus variable code syntax plus descriptions, in place of Code Connect | Organization plan for Code Connect | Code Connect is Organization-only; the convention is what `get_design_context` reads below Code Connect anyway | approved |
| 2026-09-15 | Repo shape | Single Next.js app: docs site, component source, registry build | monorepo | Kitze and AI Elements shape; split later only for an npm or non-web target | approved |
| 2026-09-15 | Hosting | Cloudflare, deferred | Vercel | Dylan's current platform; nothing deployed until asked | approved |
