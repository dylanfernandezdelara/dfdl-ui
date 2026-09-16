# Phase 5 sites and the components they need

Three real sites replace a synthetic kitchen sink. Each is restyled on a branch in a worktree using only `tokens.css` and dfdl components, captured before and after into Figma via code to canvas, and never merged as part of the lab. Adopting the system for real is a separate per-site decision that goes through each repo's own ship checklist.

| Site | Repo | Stack | What it stresses |
| --- | --- | --- | --- |
| dylanfdl.com | `~/Projects/dylanfdl_website` | Next 15, Tailwind v3, Radix dialog, cmdk | Editorial: reading measure, serif display, one accent, minimal chrome, MDX prose, command palette |
| trackcongress.org | `~/Projects/congress-tracker/web` | Vite, React 18, Tailwind v3, a little Radix | Dense data app: 13px body, three columns, filters, search, tallies, badges, party color as semantic color, member sheets, dark mode |
| forkgpt.app | `~/Projects/treeGPT` | Vite, React 19, Tailwind v4, Base UI, shadcn `base-nova`, `motion`, `motion-panels`, `cmdk`, AI Elements | AI chat: sidebar, split panes, composer, streaming, thinking disclosure, model and effort pickers, citations, selection to fork, empty states, social login |

Fork is on the same stack as dfdl-ui, so its restyle is tokens and components only. The other two carry Tailwind v3 and Radix; the restyle swaps components where a dfdl equivalent exists and leaves the rest, no framework migration.

## Foundational component inventory

Union of what the three sites actually render, grouped by the registry tier they belong to. Items marked with the site that forces them.

### Core primitives

| Component | dylanfdl | trackcongress | fork | Notes |
| --- | --- | --- | --- | --- |
| Button (variants, sizes, loading, icon) | x | x | x | Fork has `CustomButton` with content/styles/types split, worth reading for the API |
| Icon button | | x | x | Named, 24px+ hit area, `aria-label` |
| Input, Textarea | | x | x | Fork's composer is an autogrowing textarea |
| Input group (leading icon, trailing action) | | x | x | Search fields on both |
| Badge | | x | x | Status (`Passed`, `Introduced`), party, model tag |
| Segmented control | x | x | x | Tabs on dylanfdl, All/House/Senate, model or effort picker |
| Tooltip | | x | x | |
| Dropdown menu, Context menu | | x | x | User menu, filters, message actions |
| Popover | | x | x | Filters panel |
| Dialog | x | x | x | Responsive to bottom drawer on mobile |
| Sheet or side panel | | x | x | Member profile, sidebar on mobile |
| Command palette | x | | x | Both use `cmdk` |
| Collapsible or disclosure | | x | x | Expandable feed row, thinking trace |
| Separator | | x | x | |
| Avatar | | x | x | Members, user menu |
| Kbd | x | | x | Shortcuts in palette |
| Spinner | | | x | |
| Toast | | | x | |
| Theme toggle | x | x | x | All three have one |

### App patterns

| Pattern | Site | Notes |
| --- | --- | --- |
| Page header with actions | all | |
| Sidebar navigation with collapse | fork | Also trackcongress left rail |
| Three-column app shell | trackcongress | Left rail, feed, right rail |
| Split pane | fork | Source and fork side by side, resizable |
| Data row with disclosure | trackcongress | Date, title, meta line, summary, chevron |
| Tally or progress bar | trackcongress | Two-color proportional bar with label |
| Stat line | trackcongress | Label left, value right, hairline below |
| Filter bar (segmented + filter button + search) | trackcongress | |
| Empty state | fork, dylanfdl | "No published projects yet" |
| Scroll to bottom button | fork | Floating, appears on scroll |
| Social login button | fork | GitHub, Google. Kitze has a reference implementation |
| Prose or article styles | dylanfdl | MDX headings, lists, code, footnotes |
| Code block with copy | dylanfdl, fork | Shiki on dylanfdl, markdown on fork |
| Search hit highlight | dylanfdl | Pulse on match |

### AI-native

| Component | Notes |
| --- | --- |
| Message (user bubble, assistant prose) | Fork's `Message.tsx` |
| Composer or prompt bar | Autogrow, submit, model and effort controls inline |
| Model selector, effort selector | Fork has both; AI Elements has a model selector |
| Thinking or reasoning disclosure | Streams prose live, collapses; beautifului and AI Elements both have references |
| Streaming text with cursor | |
| Search or tool chips | `input-available` to `output-available` state |
| Inline citations | From `url_citation` annotations |
| Selection action (select text to fork) | Fork-specific, but the selection popover is general |
| Message actions (copy, regenerate) | Icon row under assistant message |

### Expressive

| Component | Site |
| --- | --- |
| Slot text or shuffling text | dylanfdl `OptimistText`, `slot-text` |
| Rough or hand-drawn diagrams | dylanfdl uses `roughjs` |
| Fork mark grid or scatter | Fork's brand pieces |

## What this changes in the plan

- Phase 7 first batch grows to cover what the restyles need: Button, Icon button, Input, Input group, Textarea, Badge, Segmented control, Tooltip, Menu, Popover, Dialog to Drawer, Sheet, Collapsible, Separator, Avatar, Kbd, Spinner, Toast, Theme toggle. That is the whole core tier, which is fine; Fork alone touches most of it.
- App patterns needed early: app shell, sidebar, data row, tally bar, stat line, filter bar, empty state, prose styles, code block.
- The AI-native tier stops being speculative. Fork's `Message`, `Composer`, `ChainOfThought`, `ModelSelector`, `EffortSelector` are the seed implementations; the work is generalizing and re-skinning, not inventing.
- Fork's `CustomButton` split (content, styles, types) and its Base UI usage are worth reading before designing the dfdl Button API, since it is the one place in your own code where the button had to grow real variants.
- Order for Phase 5 restyles: Fork first (same stack, most components, fastest signal), then trackcongress (density and data), then dylanfdl (editorial, and the one where the identity has to feel continuous with today).
