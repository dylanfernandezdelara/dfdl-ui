# Agentic design standards, September 2026

What "point an agent at my design system" actually means right now, what the credible teams ship, and what ui.dfdl should adopt. Sources were read directly; adoption numbers are as reported by the sources on the date noted.

## Two different things are called "design.md"

**1. `DESIGN.md`, the Google Labs format** (google-labs-code/design.md, Apache 2.0, spec version `alpha`, open-sourced April 21 2026, ~26K stars; VoltAgent/awesome-design-md, a community collection of brand files, 113K stars by Sept 2). YAML front matter of typed tokens (`colors`, `typography`, `spacing`, `rounded`, `components`) plus a markdown body in a fixed section order (Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do's and Don'ts). A CLI, `npx @google/design.md lint`, checks broken token refs and WCAG contrast. Exports to Tailwind and DTCG. Read natively by Google Stitch; read as plain markdown by everything else. Weakness, stated by its own coverage: no enforcement, an agent can ignore it. First-party adoption tracked at VoltAgent/official-design-md is still short (Mintlify, VoltAgent, a handful more).

**2. `design.md`, the Vercel file** (vercel.com/design.md, blog post Aug 31 2026). Not the Google format. It is a SKILL.md with `name`/`description` front matter and ~400 lines of prose judgment, paired with a public stylesheet (vercel.com/geist/vercel-brand.css) that defines a bounded vocabulary of `.vbg-*` classes and tokens the agent may use, and an eval loop of seven frozen scenarios run on two models. Key findings from their post:
- Porting a repo skill into a public prompt failed: every model interpreted "clean" differently. What fixed it was removing decisions from the model by publishing CSS and documenting only the class names. The agent never reads the stylesheet; it renders at view time.
- Every rule earned its place through evals. Corrections land in the narrowest enforcer: judgment in prose, mechanics in the stylesheet, anything checkable as a deterministic check.
- Naming the failure patterns they never want to see made agents avoid them more reliably than describing the desired outcome.
- Measured: 57% fewer known failures with the file loaded (39 vs 91 across six pages), with the caveat that checks only catch failures already named.

These solve different problems. The Google format describes **values** portably. The Vercel file describes **judgment** and ships **mechanics** as CSS. A serious system needs both, and Vercel's post is effectively the method for writing the prose half.

## The layered pattern the credible teams converge on

Vercel's `product-design` (blog June 25 2026) is the clearest statement, and Emil's, Jakub's and shadcn's shipped artifacts fit the same shape:

| Layer | Purpose | Vercel | Others |
| --- | --- | --- | --- |
| Entry-point skill | One `SKILL.md` per repo that resolves the request mode (shape, implement, review, copy, harden) and routes | `.agents/skills/product-design/` | Jakub's `better-interface` routes to the `better-*` domain skills |
| References | Focused files loaded on demand: judgment, interface quality, copy, surfaces, resilience, exemplars, coverage gaps | `references/`, `exemplars/` | Jakub's supporting `.md` per principle; Emil's `RECIPES.md`, `STANDARDS.md` |
| Tokens and primitives | The bounded vocabulary | Geist components, `vercel-brand.css` | shadcn `@theme`, registry items |
| Deterministic checks | Linters where a rule is mechanical | repository linters, `web-interface-guidelines` | `@shadcn/lint` (contracts, raw colors, arbitrary values), `@google/design.md lint` |
| Eval loop | Frozen scenarios, blind A/B, corrections encoded, recount | 7 scenarios × 2 models, Slack `@design-agent` feedback | `@shadcn/lint` evals (150+ runs), Vercel's `eve-design-template` |
| Canonical sources, not copies | Skill routes to owners rather than restating them | routes to Geist APIs, `web-interface-guidelines`, `design-guidelines`, `review-design-system` | Jakub: "each rule lives in exactly one skill; others name the handoff" |

Two rules from Vercel's post worth keeping verbatim: "Keep deterministic checks mechanical. Keep judgment in prose with its evidence and degree of freedom." And: "Never promote one screenshot, one shipped file, or one reviewer comment into a universal rule by itself."

## Do design engineers write one skill or many?

Both, at different scopes:

- **Craft knowledge is shipped as many small skills by the people who own it.** Jakub ships 11 (`better-ui`, `better-typography`, `better-colors`, `better-accessibility`, `better-layout`, `better-writing`, plus verb skills `interface-review`, `variant`, `break`, `explain-interface`, and the router `better-interface`). Emil ships 12 (`animate`, `improve-animations`, `review-animations`, `animation-vocabulary`, `pick-ui-library`, `prototype`, `apple-design`, `mobile-native`, `emil-design-eng`, and others). Vercel ships `web-interface-guidelines` as its own skill (heavily reinstalled under names like `web-design-guidelines`). Aggregators exist (agentsorg/design-engineering is a 72-node skill graph distilling all of the above, ui-guides has 411 rules from 16 sources) but are small and derivative.
- **Project knowledge is one entry-point skill that routes.** Vercel's rule is "keep one user-facing entry point" and "route to canonical sources instead of duplicating them." Jakub's AGENTS.md says a domain rule sitting inside a project skill belongs to its owner instead.

So the answer for ui.dfdl: write **one** skill, `dfdl-ui`, that owns only what is specific to this system, and **depend on** the third-party craft skills by name rather than rewriting them. Rewriting Emil's animation framework or Jakub's radius rules into a dfdl file would create a second copy that drifts.

What `dfdl-ui` owns:
- Token vocabulary and semantic names, with the file they live in
- Component inventory, install commands, and each component's contract (what a caller may override)
- Exact dfdl values where they differ from or narrow the general skills: curve, durations by frequency, exit ratio, radius scale, shadow recipes, grid rhythm, type roles, accent usage
- Named anti-patterns specific to this system (the Vercel technique)
- Verification steps: run lint, check both themes, check the grid overlay, check reduced motion
- Handoffs: "motion decisions beyond these values belong to `emil-design-eng`; contrast measurement belongs to `better-colors`; keyboard and focus belong to `better-accessibility` and `web-interface-guidelines`"

## Adjacent developments that affect the design

- **Anthropic Claude Design `/design-sync`** imports a design system from a GitHub repo or local codebase, reads components and styles, builds with them and self-checks against them. Vercel is a listed export connector. Implication: the ui.dfdl repository itself is an import target. Clean component source, a `DESIGN.md`, and a `components.json` make that import better without extra work.
- **shadcn registry** now has namespaces (`@dfdl/button`), `registry:base` for shipping a complete design-system preset, a public registry index, and an MCP server. Kitze UI and Vercel AI Elements both distribute this way, with `llms.txt` plus a per-page "copy for agents" block.
- **Agent Skills spec** (agentskills.io): `SKILL.md` with `name` matching the directory, `description` under 1024 chars doing double duty as the trigger, body under 500 lines, `references/` loaded on demand, `skills-ref validate` for structure. Both Jakub and Emil conform. Install path is `npx skills add <repo>`.
- **`@shadcn/lint`**: the enforcement layer the Google format lacks. Contracts per component, raw-color and arbitrary-value bans, error messages that name the fix from your own theme. Evals show one correction round to zero violations.
- **`llms.txt` and `read --llms`**: agent-browser's `read` walks up to the nearest `llms.txt`. Kitze, dylanfdl.com and AI Elements all ship one. Table stakes.

## Decision: one authored document, not two

Vercel's `design.md` is a `SKILL.md` served at a public URL; the filename is a discoverability choice, not a format. Google's `DESIGN.md` is a token export format in alpha whose first-party adoption is a handful of companies (the 113K-star collection is community-extracted brand files). The measured effects on agent output all come from skill + bounded stylesheet + linter, none from a token file alone.

So ui.dfdl authors one document, `skills/dfdl-ui/SKILL.md`, and keeps tokens where they execute, in `tokens.css`. A Google-format `DESIGN.md` is not hand-written. If a tool that is actually in use requires one, generate it from `tokens.css` as a build artifact.

## What ui.dfdl ships, and why each piece exists

| Artifact | Format | Answers | Enforced by |
| --- | --- | --- | --- |
| `tokens.css` | Tailwind v4 `@theme`, two tiers | what the values are, as executable CSS, the single source of truth | `@shadcn/lint no-raw-colors` |
| Registry | shadcn `registry.json`, `@dfdl/*` namespace, `registry:base` preset | the components and the lint policy, installable | shadcn CLI schema |
| `skills/dfdl-ui/SKILL.md` + `references/` | Agent Skills spec | how to build here: modes, values, contracts, anti-patterns, verification, handoffs | `skills-ref validate` |
| `design-system.lint.json` | `@shadcn/lint` shared policy | mechanical rules | ESLint in CI and in the agent loop |
| `llms.txt` | plain text index | discovery | agent-browser `read --llms` |
| `evals/` | frozen scenarios, before/after renders, deterministic checks | whether the guidance works | the recount |

Order of authoring, following Vercel's "build your own": pick one repeated artifact, save a baseline render without any of the above, write the first ten corrections as observable rules, then rerun. The lab phase is where the baseline comes from.

## What not to do

- Do not port the reference skills into the dfdl skill. Depend on them.
- Do not write prose rules for anything a linter can check.
- Do not publish a values-only file (a Google `DESIGN.md`, or a skill with no stylesheet behind it) and expect consistent output. Vercel measured that description alone diverges per model.
- Do not add a rule that has not failed in a run. Every line earns its place through the eval loop.
