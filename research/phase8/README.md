# Phase 8a: a fresh agent, with and without the skill

2026-10-04. Two clean `create-next-app` projects (Next 16.3.8, Tailwind v4), the same brief (`brief.md`: a settings page for a reading-list app with profile, notifications, theme and delete account). One project had `skills/dfdl-ui` in `.claude/skills/`; the other had nothing beyond the docs URL in the brief, which both got. Each ran as `claude -p` (Opus 5.5) outside this repo with `--setting-sources project`, so neither could see `AGENTS.md`, `decisions.md` or Dylan's user plugins.

## Result: pass, both arms

| | With skill | Without skill (docs + llms.txt) |
| --- | --- | --- |
| Cost, time | $1.28, 288s, 41 turns | $1.13, 224s, 31 turns |
| Components | avatar, button, card, dialog, input, segmented-control, separator, switch, toast | same nine |
| `npm run lint`, `npm run build` | pass | pass |
| dfdl lint policy (scored afterwards, changed files only) | 1: `gap-major` on CardContent (correctly denied: components own their spacing) | 0 |
| Grid audit (old probe) | 3: switch thumbs | 6: switch boxes, segment insets |
| Page title | Lora 24/32 | Lora 24/32 |
| Headings | sans 17/24 at 600 (`text-heading`) | sans 20/32 at 600 (`text-title`) |
| Text | 14/20, 14/24, captions 12/16 | 14/20, 14/24 |
| Primary buttons | 1 (Save, disabled until there is a change) | 1 (Save) |
| Accent or status color off the action | none | "Danger zone" heading in `text-danger-text` |
| 390px, no horizontal scroll | yes | yes |
| Theme switch works, no flash | yes | yes |

Screenshots: `with-skill-desktop-{light,dark}.png`, `no-skill-desktop-{light,dark}.png`, `*-phone.png`.

## What it says

The docs and `llms.txt` carry most of the standard on their own: the docs-only agent produced a page that reads as dfdl. The skill's measurable effect was judgment (no red heading) and process (it installed the probes and verified in WebKit too). Layout differed by taste: the skill arm stacked cards in one column, the other used a label column beside each card.

## dfdl bugs it found, all fixed the same day

1. **No lint for consumers.** Both agents ran `npm run lint` as the skill says and got only Next's checks. Now the `lint` registry item.
2. **Switch off the control scale.** A 20px box centered in a row lands 2px off the grid; both pages failed on it. Now a 24px box around the same track, pixel-identical.
3. **Grid audit flagged components' own parts** (segment insets, thumbs), telling agents to restyle what the contracts forbid. The probe and overlay now judge a control as one block.
4. **`mt-minor` "unrecognized" on components.** `@shadcn/lint` 0.2.0 does not read custom spacing names; the policy allows the dfdl margins by name.
5. **Setup steps.** The skill omitted `shadcn init` (one agent hand-wrote components.json), and init leaves an unused `cn` package. Skill, installation page and llms.txt now say both.

Not run: 8b (a Figma mockup; the library was dropped on 2026-09-25) and 8c (adopting an outside component by the recipe; the Command palette is the planned case).
