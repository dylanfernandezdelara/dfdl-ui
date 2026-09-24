# dfdl-ui plan and status

Living document. Update the status table and the log in the same commit as the work. Agents resuming this project: read this file, then `decisions.md`, then `research/`.

## Goal

Dylan's design standard as one installable package, so any future project starts with "install `@dfdl/*`, read the `dfdl-ui` skill, here is my Figma mockup" and comes back looking and moving like he made it. Opinionated and enforced, small, motion-first, extensible through a written adoption recipe. Code is the source of truth. Figma is where the standard is designed with, refined, and learned.

## Deliverables

| # | Deliverable | Reader |
| --- | --- | --- |
| 1 | Published Figma library `dfdl` in the DFDL Studio team: foundations pages, variables with light/dark modes and `var()` code syntax, one component per page with variants bound to variables, motion variables and animated components, patterns, cover with identity and do-not list. Scratch duplicate `dfdl — scratch` for agent runs | Dylan, future mockups |
| 2 | `tokens.css`: OKLCH, primitives → semantics, light/dark, Tailwind v4 `@theme` | code, linter |
| 3 | Component registry `@dfdl/*`: source per component, lint contract, `registry:base` preset, per-item dependencies | agents via `npx shadcn add` |
| 4 | `skills/dfdl-ui/SKILL.md` + references, including the adoption recipe; installable via `npx skills add`, also served at a public URL | agents |
| 5 | `@shadcn/lint` policy: no raw colors, no arbitrary values, per-component restyle contracts | CI, agent loop |
| 6 | Docs site: live demos of every state, slow-motion toggle, copy for agents, `llms.txt` | humans and agents |
| 7 | `decisions.md` and `research/` | anyone refining the standard later |

## Infrastructure

- GitHub: `dylanfernandezdelara/dfdl-ui`, public. Commit and push at the end of every phase, lab, and component.
- Figma: remote MCP connected in Devin CLI at user scope (`figma`, `https://mcp.figma.com/mcp`). Team `DFDL Studio`, Pro tier, Full seat. All files in that team. Agents write to the scratch file only. Lab captures go to `dfdl — lab` (`slkV1ZgOSG2hBKNI3dBsU5`); the root layout loads Figma's capture script in development so any page can be pushed with `generate_figma_design`. Do not add Figma's desktop server (`127.0.0.1:3845`) to the CLI; it shadows the remote write tools.
- agent-browser installed for browser-side verification. Animation probe: `document.getAnimations()` after interaction.
- Not set up on purpose: Cloudflare deploy (waits for Dylan), Code Connect (Organization plan; revisit only if Phase 8 fails on component recognition).

## Rules

- Bounded choices, not descriptions. Every lab shows three candidates: Dylan's current values as the baseline, labeled, plus two alternatives. "Keep mine" is always valid.
- Static work can be reviewed in Figma or the browser. Motion and states are reviewed in the browser only, at 10% speed, probe-verified.
- Every accepted correction lands in the narrowest holder: linter if mechanical, skill if judgment, `decisions.md` always.
- If code and Figma disagree, code wins and Figma is regenerated.
- No component enters the registry without a consumer. Build what the three restyle sites need; future projects pull the rest.
- No raw color values anywhere, including the lab. Lint is on from the first commit.
- Interim motion until the motion lab: `cubic-bezier(0.23, 1, 0.32, 1)`, 150ms hover, `scale(0.97)` press. Recorded as unreviewed.
- Accepted gap: `system-ui` has no Figma equivalent. The library renders body text in Inter; code ships the system stack. Noted on the library cover and in the skill.

## Phases

| Phase | Scope | Dylan's time | Output | Status |
| --- | --- | --- | --- | --- |
| R | Research: inspiration audit, agentic standards, Figma workflow, Phase 5 sites | done | `research/` | done |
| 0 | Scaffold: Next 16, Tailwind v4, Base UI, shadcn CLI, Lora + Geist Mono, 8/24 grid overlay, `@shadcn/lint` on, reference skills installed, `/lab` route, `decisions.md` | none | running localhost, first push | done |
| 1 | Color and surfaces lab: neutral ramp with roles, three accents at matched OKLCH L/C shown in context, three shadow recipes; accent revisited after dark-mode shadows. Baseline = dylanfdl.com tokens | ~45 min | `tokens.css` colors | done (accent vividness confirmed in 1b) |
| 1b | Fork mini before/after with candidate tokens | ~15 min | screenshot pair in `research/` | done: ember 60%, indigo kept as a second approved accent |
| 2 | Type, rhythm and shape lab: role scale vs weight-carries-hierarchy, serif scope, radius with concentric nesting, article and dense panel under each. Baseline = current sites | ~45 min | `tokens.css` type, radius | done: weight-led 15px, Lora on all headings, round radius |
| 3 | Motion lab, browser only: two curves at 10% speed, symmetric vs 75% exits, press 0.96/0.97/none, pop-in origin, spring vs curve on drawer, reduced-motion variants, all probe-verified. Baseline = Fork's current motion | ~60 min | `--ease-*`, `--duration-*` | done: strong ease-out, exits 75%, press 0.97 |
| 3b | Fork mini before/after with motion tokens | ~15 min | screenshot pair | done: probe table + filmstrip in `research/fork-3b/`, Phase 5 motion fixes listed |
| 5 | Before/after on Fork, then trackcongress, then dylanfdl. Branch in a worktree, tokens and first components only, captured before/after into Figma. Loop back to the lab that is off. Nothing merges. Then first draft of `SKILL.md` and lint contracts from `decisions.md` | one longer review per site | skill v0, lint policy v0 | pending |
| 6 | Figma library via `figma-generate-library` into scratch; review; promote to `dfdl` and publish | review the file | deliverable 1 | pending |
| 7 | Components, one per unit: source, registry item, contract, docs page with every state and slow-motion toggle, motion spec verified by probe, Figma component. Only components with a consumer. Core first, then app patterns, AI-native (Fork's pieces as seeds), expressive | review each like a PR | deliverables 3, 6 | pending |
| 8 | Sanity check, once: (a) fresh agent with and without the skill, (b) a Figma mockup built from the library handed to an agent, (c) adopt one outside component via the recipe | ~20 min | pass/fail notes | pending |

## Component backlog

Populated after Phase 5 from what the restyles actually needed. Until then the candidate inventory is `research/phase5-sites.md`.

## Not doing

Google `DESIGN.md`. Code Connect on Pro. Cloudflare deploy until asked. Copying Emil, Jakub or Figma skills into the dfdl skill (hand off by name). Framework migrations on the three sites. 150 components or multiple themes. Pushing to any repo other than `dfdl-ui`.

## Log

- 2026-09-24: 3b done. Fork motion retokened in the worktree (ten CSS declarations to tokens, menu pop-in and press added through the mapping file). Probe: before, the chat menu and buttons had no animation at all; after, menu pops in 200ms on the approved curve from its trigger and presses scale 0.97 at 150ms. Five motion defects logged for Phase 5 (sidebar animates width, `transition-all` on buttons, keyframe dialog, unmounting menu, animated `top`).

- 2026-09-24: Lab 3 decided (`?c=b&x=b&p=b` under the old labeling): Emil's strong ease-out, exits at 75%, press 0.97, popovers from the trigger, drawers on the iOS curve with the spring reserved for gestures. Decided through a Decide section with synchronized ¼-speed play and a stated recommendation, after Dylan reported the one-at-a-time comparison was too subtle. Motion is no longer interim; every token in `tokens.css` is approved. Lab relabeled so A is the approved set.

- 2026-09-24: Lab 3 built at `/lab/motion`: curve (Fork's `ease` / Emil strong-out / Material decelerate), exit (symmetric / 75% / fade-only 50%), press (none / 0.97 / 0.94), plus lab knobs for 0.1x speed, popover origin, drawer spring vs curve and a reduced-motion preview. Specimens are real transitions with `@starting-style` enters and `allow-discrete` display, so enter and exit can differ. Every transition probe-verified with `getAnimations()`: durations, curves and from/to values match the tokens. Fork's current motion measured as the baseline: built-in `ease` at 120–300ms, no press scale.

- 2026-09-24: Lab 2 decided (`?s=c&f=b&r=c`): weight-led scale (15px body/heading/title, weight 550, UI 13 at 450, display 32), Lora on every heading, round radius (8/10/12/16/24). Written to `tokens.css`; lab A relabeled to the approved set with the previous values kept as an alternative.

- 2026-09-24: Lab 2 built at `/lab/type`: scale (current / roles / weight-led), serif scope (display / all headings / none), radius (current / soft / round) on an article, a dense panel and a concentric card. Type roles are now tokens (`text-display … text-caption` carry size, leading and weight together). Two system bugs found on the way: `cn` dropped custom `text-<role>` classes as colors (fixed by registering the vocabulary in `lib/utils.ts`), and `@shadcn/lint` 0.1.0 flagged `text-<role>` as raw colors (fixed upstream in 0.2.0, upgraded and pinned). Candidate switcher moved to `lab/_shared`.

- 2026-09-24: 1b done. Two approved accents (ember default at 60% vividness, indigo for Fork), selected per product with `data-accent`. Dark vividness set per accent after finding blue’s chroma ceiling halves at high lightness. Fork before/after boards in `research/fork-1b/`; the Fork worktree `../treeGPT-dfdl-tokens` keeps the mapping file for Phase 5.

- 2026-09-19: Lab 1 decided: neutral B (unified warm, hue 80), accent B (ember, hue 48), depth A (ring and lift). Color tokens now generated by `scripts/color/build-tokens.mts`; status ramps added with bg/border/solid/text steps and hues moved 30+ degrees from the accent. Open question for 1b: whether ember should be more vivid than the inherited proportion.

- 2026-09-19: Lab 1 captured into Figma (`dfdl — lab`, page `Lab 1 · Color and surfaces`, light and dark of the A/A/A baseline side by side) for canvas comments.

- 2026-09-19: Lab 1 built at `/lab/color`. Candidates are generated by `scripts/color/build-candidates.mts` (culori, OKLCH, Radix lightness spines, WCAG contrast measured) into `src/styles/lab/candidates.css` and `candidates.json`; A on every axis is `tokens.css` itself. Selection is URL-carried (`?n=&a=&d=`). Found and worked around an `@shadcn/lint` 0.1.0 limitation: `shadow-<name>` is read as a color utility, so elevation ships as `elevation-raised` / `elevation-floating` utilities.

- 2026-09-15: Phase 0 done. Next 16.3 (create-next-app resolved to 16, not 15), Tailwind v4, Base UI via shadcn `base-nova`. Interim `tokens.css` lifted from dylanfdl.com as the Lab 1 baseline. Grid overlay ported and shipped as a dev tool (`g`, `?grid=1`). `@shadcn/lint` 0.1.0 pinned exactly (one day old, source audited: no install scripts, no network); policy in `design-system.lint.json`; lint and typecheck clean. Motion utilities added so the linter's arbitrary-value rule holds even for durations and transition sets. 27 reference skills vendored under `.agents/skills/` at pinned commits. `AGENTS.md` written.

- 2026-09-15: Research complete and pushed. Figma MCP connected and verified on the Pro Full seat. GitHub repo created. Plan approved with seven amendments (baseline candidate in every lab, Fork checkpoints after labs 1 and 3, interim motion declared, shape folded into lab 2, consumer rule for components, system-ui gap accepted, adoption recipe tested in Phase 8).
