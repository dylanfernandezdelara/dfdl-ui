# Figma tooling, verified against the docs (September 2026)

Read directly: developers.figma.com MCP server docs (intro, tools and prompts, write to canvas, code to canvas, rate limits), the Help Center MCP FAQ, the Code Connect and plans-and-features articles, the pricing page, and the fourteen official skills in `figma/mcp-server-guide` (cloned to `/tmp/figma-guide`). Where a claim below matters for cost or feasibility, the source is named.

## Plans and what each unlocks

| Capability | Starter (free) | Professional Full seat, $16/mo | Organization Full seat, $55/mo |
| --- | --- | --- | --- |
| MCP read tools (`get_design_context`, `get_variable_defs`, screenshots) | 20 calls/month | 200/day, 10/min | 200/day, 15/min |
| MCP write (`use_figma`) to files outside drafts | no | yes, same call budget | yes |
| Code to canvas (`generate_figma_design`) into drafts | yes, any seat | yes | yes |
| Publish a team library (components, styles, variables) | no | yes | yes, across teams |
| Variables and modes | no | up to 10 modes per collection | 20 |
| Figma Motion (timeline, springs, motion variables) | open beta, but Full seat required for publishing animated components, agent-generated motion, video export | yes | yes |
| Dev Mode annotations | no | yes | yes |
| **Code Connect** (UI or CLI) | no | **no** | yes |
| Shared fonts, branching, library analytics | no | no | yes |

Sources: rate limits page; plans-and-features table (`Code Connect` row is Organization and Enterprise only, `Libraries for components, styles, and variables` starts at Professional); pricing page (Motion beta is Full seat); MCP FAQ (Full seat required to write outside drafts, Dev seats read-only).

The rate limit applies to reads. The FAQ lists only `add_code_connect_map`, `create_new_file` and `whoami` as exempt; `use_figma` is not listed as exempt, so budget it. Write to canvas is "free during the beta period" and "will eventually be a usage-based paid feature."

## The remote server tools that matter here

| Tool | Direction | What it actually does |
| --- | --- | --- |
| `use_figma` | code → Figma | Executes Plugin API JavaScript inside a file. Creates frames, components, variant sets, variables with modes, styles, auto layout. 20 KB response cap per call; no images; fonts must be uploaded to the account or already in Figma's library. Must be sequential, never parallel. |
| `generate_figma_design` | localhost → Figma | Injects a capture script into a running web app, opens a browser toolbar, and turns rendered UI (whole screen or a selected element, in whatever state you click it into) into flat editable layers. Binds captured values to library variables if the library is enabled in the target file. No library component instances; flat layers only. |
| `get_design_context` | Figma → code | Returns React + Tailwind reference code, a screenshot, variable names with their code syntax, layer names, component names and properties, annotations, and Code Connect snippets when they exist. The official skill says treat it as reference and adapt to the project's real components. |
| `get_variable_defs` | Figma → code | Variables and styles used in a selection. |
| `get_motion_context` | Figma → code | For animated nodes: keyframes, easing (cubic or spring), timing, precomputed CSS `@keyframes` and motion.dev snippets, and `timelineCohorts` for coordinating staggered children. Joined to `get_design_context` by node id. |
| `search_design_system`, `get_libraries` | Figma → code | Find components, variables and styles across enabled libraries. |
| `add_code_connect_map`, `get_code_connect_map` | code → Figma | Code Connect mappings. Plan-gated to Organization. |
| `create_new_file` | | Blank file in drafts. Exempt from rate limits. |

## The official skills and what each owns

Fourteen skills in `figma/mcp-server-guide/skills`, ~2,700 lines. The ones this project uses:

- **`figma-use`**: mandatory before any `use_figma` call. Plugin API rules: `return` data, colors 0 to 1, load fonts before writing text, set the page once per call, return every created node id.
- **`figma-generate-library`**: builds a design system in Figma from a codebase. Five phases, 20 to 100+ calls, strictly sequential. Phase 0 discovery and gap analysis, Phase 1 variables (primitives, then semantics aliased to primitives, scopes on every variable, WEB code syntax as `var(--name)`), Phase 2 page structure and foundations docs, Phase 3 one component per page with variants bound to variables, Phase 4 Code Connect and audits. Keeps a state ledger on disk because the workflow outlives a context window. This is the closest thing to a spec for our Phase 5.
- **`figma-generate-design`**: builds screens in Figma from library component instances. Recommends running `generate_figma_design` in parallel for a pixel-accurate reference, then matching the component-instance version to it, then deleting the capture.
- **`figma-design-to-code`**: the read direction. Priority order for hints: Code Connect snippet, then component documentation links, then design annotations, then design tokens as CSS variables, then raw hex. Icons and images come back as expiring asset URLs that must be downloaded and committed.
- **`figma-use-motion`** and **`figma-implement-motion`**: write and read animation. Motion APIs are gated behind a `metronome` user flag; the skill says bail immediately if the API throws "not a supported API." `get_screenshot` never shows motion; verifying on the Figma side means `export_video` and sampling frames, which is slow and expensive.
- **`figma-code-connect`**: writes parserless `.figma.ts` templates. States plainly that Code Connect is not available on Free or Professional.

## Constraint that changes the plan: Code Connect is Organization-only

Half 2 of the loop (design in Figma with the dfdl library, hand the agent a link, get `<Button variant="primary">` back) was described as depending on Code Connect. On a Professional seat that mapping does not exist, so the agent would see a component named `Button` with a `variant=primary` property and have to infer the code component.

The `figma-design-to-code` priority list shows the fallback is already built in. Below Code Connect, the agent uses component documentation links, annotations and CSS variable names. On Professional we control all three:

1. **Deterministic component and property names.** Figma component `dfdl/Button` with properties `variant`, `size`, `loading` that match the React props exactly. The dfdl skill states the rule: a Figma component named `dfdl/X` is `@dfdl/x` and its properties are its props. Never rebuild it.
2. **Variable code syntax.** Every variable carries `var(--color-accent-solid)` as its WEB code syntax, so `get_design_context` emits the real token name, and `no-raw-colors` in the linter catches anything that does not resolve.
3. **Component descriptions and Dev Mode annotations.** The `figma-generate-library` skill already puts usage guidance in the component description. Annotations are available on Professional. Both come through in design context.

That is a convention-based Code Connect. It is weaker than the real thing (no rendered snippet in Dev Mode, no property-level template) but it is what the agent reads anyway, and the lint policy catches the failure mode where the agent restyles instead of reusing. If this ever proves unreliable in the sanity check, Organization at $55/mo is the upgrade, and the mappings drop in without changing the library.

## Other constraints worth knowing before starting

- **Fonts.** `use_figma` can only use fonts already in Figma's catalogue or uploaded to the account. Lora and Geist Mono are Google Fonts and should resolve; verify with `figma.listAvailableFontsAsync()` in the first discovery call. `system-ui` has no Figma equivalent; the library will render body text in Inter or SF Pro and the code will render the system stack. That gap is inherent and should be written down as accepted.
- **Images.** `use_figma` cannot set image fills from URLs. The `figma-generate-design` skill's workaround is to capture with `generate_figma_design` first and copy `imageHash` values.
- **Call budget.** 200 reads per day at 10 per minute. `use_figma` runs a whole script per call, so a token collection of fifty variables is one call, not fifty. Human editing on the canvas costs nothing. The expensive pattern is an agent doing screenshot, adjust, screenshot in a tight loop; that is what localhost is for.
- **Motion verification on the Figma side is expensive.** Curves and durations are authored there; feel is verified in the browser at 10% speed with the `getAnimations()` probe. Do not use `export_video` as the review loop.
- **Beta quality.** The FAQ recommends testing on a duplicate before touching a production library. The dfdl library file should have a scratch duplicate for agent runs.

## How the loop looks with these constraints

| Step | Tool | Seat needed |
| --- | --- | --- |
| Lab pages with real interaction, reviewed at 10% speed | localhost, agent-browser probe | none |
| Push a lab page or kitchen sink into Figma for side-by-side review and comments | `generate_figma_design` | any (drafts) |
| Tokens from `tokens.css` become variables with modes and code syntax | `figma-generate-library` Phases 0 to 1 | Full, Professional |
| Components become a published library with variants bound to variables, one page each | `figma-generate-library` Phase 3 | Full, Professional |
| Motion values as motion variables and animated components | Figma Motion, `figma-use-motion` | Full, Professional |
| New project: design with the dfdl library, hand the agent a link | `get_design_context`, `get_motion_context`, dfdl skill, naming convention | Full, Professional |
| Real Code Connect mappings with rendered snippets | `add_code_connect_map`, `.figma.ts` | Organization |

## Decision

Professional Full seat at $16/month covers everything except Code Connect. Replace Code Connect with the naming-plus-code-syntax convention, enforced by the dfdl skill and the lint policy, and test it in the end-of-foundations sanity check. Revisit Organization only if that check fails.
