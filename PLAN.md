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
| 6 | Docs site: live demos of every state, slow-motion toggle, copy for agents, `llms.txt` | done: docs site live at dfdl-ui.fernandezdelaradylan.workers.dev as a component library; Figma library not needed for the site (Dylan, 2026-09-25), kept only as an open question |
| 7 | `decisions.md` and `research/` | in progress: 19 components with pages, registry items, contracts and probe-verified motion; trackcongress adoption next, then Command palette |

## Infrastructure

- GitHub: `dylanfernandezdelara/dfdl-ui`, public. Commit and push at the end of every phase, lab, and component.
- Figma: remote MCP connected in Devin CLI at user scope (`figma`, `https://mcp.figma.com/mcp`). Team `DFDL Studio`, Pro tier, Full seat. All files in that team. Agents write to the scratch file only. Lab captures go to `dfdl — lab` (`slkV1ZgOSG2hBKNI3dBsU5`); the root layout loads Figma's capture script in development so any page can be pushed with `generate_figma_design`. Do not add Figma's desktop server (`127.0.0.1:3845`) to the CLI; it shadows the remote write tools.
- agent-browser installed for browser-side verification. Animation probe: `document.getAnimations()` after interaction.
- Not set up on purpose: Code Connect (Organization plan; revisit only if Phase 8 fails on component recognition).

## Rules

- Bounded choices, not descriptions. Every lab shows three candidates: at decision time, Dylan's current values as the baseline, labeled, plus two alternatives. "Keep mine" is always valid. Once decided, A is relabeled to the approved set.
- Static work can be reviewed in Figma or the browser. Motion and states are reviewed in the browser only, at 10% speed, probe-verified.
- Every accepted correction lands in the narrowest holder: linter if mechanical, skill if judgment, `decisions.md` always.
- If code and Figma disagree, code wins and Figma is regenerated.
- No component enters the registry without a consumer. Build what the three restyle sites need; future projects pull the rest.
- No raw color values anywhere, including the lab. Lint is on from the first commit.
- Accepted gap: `system-ui` has no Figma equivalent. The library renders body text in Inter; code ships the system stack. Noted on the library cover and in the skill.

## Phases

| Phase | Scope | Dylan's time | Output | Status |
| --- | --- | --- | --- | --- |
| R | Research: inspiration audit, agentic standards, Figma workflow, Phase 5 sites | done | `research/` | done |
| 0 | Scaffold: Next 16, Tailwind v4, Base UI, shadcn CLI, Lora + Geist Mono, 8/24 grid overlay, `@shadcn/lint` on, reference skills installed, `/lab` route, `decisions.md` | none | running localhost, first push | done |
| 1 | Color and surfaces lab: neutral ramp with roles, three accents at matched OKLCH L/C shown in context, three shadow recipes; accent revisited after dark-mode shadows. Baseline = dylanfdl.com tokens | ~45 min | `tokens.css` colors | done (accent vividness confirmed in 1b) |
| 1b | Fork mini before/after with candidate tokens | ~15 min | screenshot pair in `research/` | done: ember 60%, indigo kept as a second approved accent |
| 2 | Type, rhythm and shape lab: role scale vs weight-carries-hierarchy, serif scope, radius with concentric nesting, article and dense panel under each. Baseline = current sites | ~45 min | `tokens.css` type, radius | done: weight-led (body raised to 16 on 2026-09-25), Lora on all headings, round radius |
| 3 | Motion lab, browser only: two curves at 10% speed, symmetric vs 75% exits, press none/0.97/0.94, pop-in origin, spring vs curve on drawer, reduced-motion variants, all probe-verified. Baseline = Fork's current motion | ~60 min | `--motion-*` | done: strong ease-out, exits 75%, press 0.97 |
| 3b | Fork mini before/after with motion tokens | ~15 min | screenshot pair | done: probe table + filmstrip in `research/fork-3b/`, Phase 5 motion fixes listed |
| 5 | Before/after on trackcongress, then dylanfdl (Fork deferred by Dylan, 2026-09-24). Branch in a worktree, tokens and first components only, captured before/after into Figma. Loop back to the lab that is off. Nothing merges. Then first draft of `SKILL.md` and lint contracts from `decisions.md`. trackcongress is React 18 + Tailwind v3.4 + Vite with its own `DESIGN_LANGUAGE.md` and `qa:web` viewport checks; tokens apply as CSS variables through a v3 config extension, no migration | one longer review per site | skill v0, lint policy v0 | both sites retokened in worktrees; trackcongress ruled (quiet mode); dylanfdl boards awaiting Dylan |
| 6 | Docs site shell first (Dylan, 2026-09-24): overview, foundations (color, type, shape, motion), guide, llms.txt, `@dfdl/tokens` registry item; Cloudflare Workers at ui.dylanfdl.com. Then Figma library via `figma-generate-library` into scratch; review; promote to `dfdl` and publish | review the site | deliverables 1, 6 | done: docs site live at dfdl-ui.fernandezdelaradylan.workers.dev as a component library; Figma library not needed for the site (Dylan, 2026-09-25), kept only as an open question |
| 7 | Components, one per unit: source, registry item, contract, docs page with every state and slow-motion toggle, motion spec verified by probe, Figma component. The docs site is the first consumer (Dylan, 2026-09-24): Button, Segmented, Card, Command, Kbd, Table, Swatch, then Tabs, Menu, Dialog, Drawer; the docs are rewritten onto each as it lands. trackcongress and dylanfdl needs come next. AI-native (Fork's pieces) is backlog | review each like a PR | deliverables 3, 6 | in progress: 19 components with pages, registry items, contracts and probe-verified motion; trackcongress adoption next, then Command palette |
| 8 | Sanity check, once: (a) fresh agent with and without the skill, (b) a Figma mockup built from the library handed to an agent, (c) adopt one outside component via the recipe | ~20 min | pass/fail notes | pending |

## Component backlog

Populated after Phase 5 from what the restyles actually needed. Until then the candidate inventory is `research/phase5-sites.md`.

## Not doing

Google `DESIGN.md`. Code Connect on Pro. Cloudflare deploy until asked. Copying Emil, Jakub or Figma skills into the dfdl skill (hand off by name). Framework migrations on the three sites. 150 components or multiple themes. Pushing to any repo other than `dfdl-ui`.

## Log

- 2026-09-26: trackcongress PR C1 (#195): all sheets on the dfdl Sheet. At Dylan's prompt the web tests were reviewed rather than trusted: shuffled runs, mutation checks (one gap found and covered), vacuous assertions fixed, and a real-browser `qa:sheets` (Chromium + WebKit) added, which caught two regressions jsdom missed. Upstream in dfdl: Sheet animates in when mounted open; `cn` moved off the young `cn` package to tailwind-merge; theme split into theme.css + base.css; Sheet centered from 640px.

- 2026-09-26: trackcongress: Tailwind v4 PR (#192) merged and live. At Dylan's request the bill chat was removed (#193, built by two subagents in separate worktrees, integrated and verified here: fresh installs, npm test, qa:web 8/8, share-quote end to end) and its Cloudflare leftovers deleted: `chat_usage` dropped in production and preview D1, `CHAT_HMAC_SECRET` deleted from both workers; the rate-limit binding went with the deploy. Bill-text ingestion kept: share-quote still verifies against it. dylanfdl #110 merged (articles back to the site's own type). Next: trackcongress PR B, dfdl tokens and quiet mode.

- 2026-09-25: trackcongress adoption, PR A of 3 (congress-tracker#192): Tailwind v3 → v4 with no visual change, proven by pixel diff of full pages and interactive states at the qa:web viewports. The upgrade tool's @utility conversion dropped runtime-built class names; kept component CSS as plain @layer components instead. Found a production bug the upgrade fixes (party bars transparent: v3 purged runtime-built class names). npm test and qa:web pass; preview uploaded. Next: PR B (dfdl tokens + quiet mode), PR C (components).

- 2026-09-25: Eight components for trackcongress's needs: Avatar, Collapsible, Combobox, Input group, Popover, Separator, Sheet (Base UI Drawer: bottom, swipe, nested stacking), Toast (stacked, swipe, fade exit). 19 in the registry. New motion utilities sheet-popup/-backdrop, motion-reveal, toast-root/-content, all transform and opacity only; Collapsible opens without animating height. Motion verified with getAnimations: sheet 500ms drawer curve in, 375 out; popover 150 out; toast 16px in over 200, fade out 150; reveal 150. Grid audit zero. Decided with Dylan: dfdl stays Tailwind v4; v3 sites upgrade in their adoption PR.

- 2026-09-25: Dylan chose his site's type structure over Lab 2's: Lora on titles only (new `headline` 28/32 for articles, `display` 24/32 for pages), sans headings at 600 (`title` 20/32, `heading` 17/24), UI 14/20. Weight-led and Lora-on-every-heading superseded. Future (very end): buy a domain on Cloudflare (e.g. dfdl-ui.com) instead of moving dylanfdl.com's DNS.

- 2026-09-25: The first "optimist." fix (baseline + overflow-y: clip) passed in Chromium and was 3.5px high in Safari; Dylan caught it on the preview. WebKit takes an overflow-clipped inline-block's baseline from its bottom edge. Fixed with a clip-path mask (dylanfdl PR #109), measured by ink pixels on a production build in Chromium, WebKit and Firefox. Skill, guide, probe and decisions now require clip-path for inline masks and a WebKit check for text alignment.

- 2026-09-25: Type sizes corrected from measurement after Dylan found dylanfdl.com's prose too big and "optimist." sitting high. Root cause in Phase R: the audit summary read dylanfdl.com's `<body>` default (16/24) as its body text; the paragraphs render 14/24 at 450 (articles 15/24). That propagated into the Lab 2 "Previous" candidate, the 16px body decision and the 16px blurb in PR #107. Tokens now: body 14/24/450, new reading 15/24, heading 14 and title 15 at 550 (weight-led kept), display Lora 24/32. The optimist offset is slot-text cells aligned text-bottom (0.5px at 14, 1px at 16); new `scripts/probes/baseline.js` catches it, and the skill and guide require baseline alignment and measuring paragraphs rather than `<body>`.

- 2026-09-25: Components hardened. Height contracts in `design-system.lint.json` for every control (verified: `w-full` and margins pass, `h-12`/`size-10`/`w-12` on a Switch fail with the reason). State examples on each control's page (disabled, invalid, disabled tab, grouped menu, icon-only segmented). Motion verified in the browser per component with getAnimations: menu 200 in / 150 out from 0.95, dialog 300 / 225 from 0.96, tooltip 100 / 75 from 0.97, switch 150, press 0.97 over 150, tabs indicator transform-only 200; reduced motion fades without scale. Found and fixed: the tabs indicator ignored reduced motion (specificity). Each page now states its verified motion. First `skills/dfdl-ui/SKILL.md` written from decisions.md and the guide; a `probes` registry item ships the grid and animation probes to consumers.

- 2026-09-25: Docs site rebuilt as a component library (Dylan's direction: official look, simple fonts, terse copy). Eleven `@dfdl/*` components on Base UI (badge, button, card, dialog, input, kbd, menu, segmented control, switch, tabs, tooltip), each with a page (Preview/Code from the example file, install, usage, examples, props), a registry item, and a gallery tile. `theme` registry item split out of globals.css so components install into other apps. Header nav, mobile nav on the Menu component, "On this page" column, shiki highlighting mapped to tokens. Registry points at the workers.dev URL until DNS moves. Every page audits at zero. Figma not part of this pass. Deploy needed the read-only static-assets incremental cache: without one, OpenNext 404s pages prerendered from generateStaticParams. Install verified end to end in a fresh create-next-app + shadcn init project from the live registry; it works once globals.css is replaced with the dfdl imports (shadcn init's own theme block otherwise wins on page color and radius), which the installation page now says.

- 2026-09-25: Body, heading and title raised to 16px after the dylanfdl preview read small (PR #107 updated). Then a three-agent audit (attributions, internal consistency, code review) and its fixes: eleven false or loose attributions corrected (see `decisions.md`, Attributions); stale names and statuses across AGENTS, PLAN, lint messages and lab copy; `tokens.json` elevation carried the dark recipes under `light` (export now reads each appearance); color lab candidate A still showed the pre-Lab-1 ember vividness; the tab indicator animated `width`; the closed drawer stayed focusable; specimens ignored the real `prefers-reduced-motion`; lab radio groups had no arrow keys; no visible focus on links; no skip link; a dead `/components/button` link on the overview. Every page audits at zero grid offenders (the motion lab had four, from 28px controls centered in 32px rows). Dylan then approved both open items: light `fg-tertiary` to 62% lightness (2.48:1 to 3.56:1) and the default control height to 32 (28 stays as the dense size).

- 2026-09-24: Deployed to Cloudflare Workers with OpenNext (`@opennextjs/cloudflare` 1.20.6; vinext skipped as a one-day-old beta): https://dfdl-ui.fernandezdelaradylan.workers.dev. Fully static build, verified in workerd locally first. `ui.dylanfdl.com` blocked on DNS: dylanfdl.com's nameservers are Vercel's, and a Workers custom domain needs the zone on Cloudflare.

- 2026-09-24: Docs site shell built in the kitze pattern (sidebar, overview, four live foundations pages rendered from `src/generated/tokens.json`, guide, `/llms.txt`), labs moved under it. First registry item `tokens` (`public/r/tokens.json`, `npm run registry`). Every page audits at zero strict grid offenders; getting there fixed the lab specimens and found that inline serif emphasis inflates a line box by a pixel (base rule added). Hosting decided: Cloudflare Workers at ui.dylanfdl.com. dylanfdl PR #107 open with Vercel preview, awaiting Dylan.

- 2026-09-24: Grid alignment made mechanical at Dylan's request. `scripts/probes/grid.js` and `src/lib/grid-audit.ts` measure every block against the 8px grid (4px half-step tolerated); `Shift+G` outlines offenders in the overlay. `hairline-*` utilities replace rhythm-breaking borders. Dogfooded on the lab chrome: a 2px section-header error was cascading down whole pages; fixed. Home page audits at 0. Lab specimen internals still carry offenders (backlog; labs are exempt, component pages are not). Run against dylanfdl: header 2px off, TOC unitless line-height 16.8px, recorded for the real adoption.

- 2026-09-24: Phase 5, dylanfdl before/after in worktree `../dylanfdl_website-dfdl` (Tailwind v3.4, correcting the earlier v4 assumption). Mapping layer over `bg/fg`, gruvbox hues, shadcn aliases and the `.article-shell` type variables. `npm run check` green (234 tests). Boards in `research/dylanfdl-5/`, article before/after in Figma. Not pushed, no PR, per Dylan.

- 2026-09-24: Dylan ruled on the trackcongress conflicts: sans headings and no accent for data-dense products. Implemented as `data-quiet` on the root in both `tokens.css` and `tokens.hsl.css`; trackcongress worktree switched to quiet mode and re-captured. Boards now show before / dfdl full / dfdl quiet.

- 2026-09-24: Phase 5, trackcongress before/after done in worktree `../congress-tracker-dfdl` through a mapping layer only. `tokens.hsl.css` added (HSL channel export for Tailwind v3 consumers, `scripts/color/export-legacy.mts`; color scripts refactored around `system.mts`). `qa:web` 8/8 with the tokens on. Boards in `research/trackcongress-5/`, before/after side by side in Figma (`dfdl — lab`, page “Phase 5 · trackcongress”). Four disagreements between the app’s design language and dfdl recorded for Dylan: second typeface, accent presence, dark surface lightness, headline size.

- 2026-09-24: Scope change from Dylan: Phase 5 applies to trackcongress and dylanfdl only; Fork is deferred. Indigo remains an approved accent for when Fork or another product claims it; the Fork worktree stays as reference. Component scope follows the consumers. trackcongress stack recorded: React 18, Tailwind v3.4, Vite 7, `DESIGN_LANGUAGE.md`, `qa:web` across four viewports in both themes.

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
