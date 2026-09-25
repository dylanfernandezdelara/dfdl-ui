/**
 * The guide, as data. Rendered at /guide and serialized into /llms.txt so people and agents read the same text.
 * v0, written from decisions.md after Phase 5. The dfdl-ui skill will be drafted from this.
 */
export type GuideSection = { id: string; title: string; body: string[]; code?: string }

export const GUIDE: GuideSection[] = [
  {
    id: "identity",
    title: "Identity in one paragraph",
    body: [
      "Warm and quiet. One neutral family carries surfaces and text: cream in light, charcoal in dark, never pure white or black. Hierarchy comes from weight and family, not size: body, headings and titles share 16px, Lora at 550 marks a heading. One accent per product marks the primary action and selection and nothing else. Corners are round and concentric. Motion is strong ease-out, short, and never something you would describe. Everything lands on an 8px grid, and the grid is measured.",
      "If a screen looks like a competent generic dashboard, it is wrong. If a screen looks like a personal site that happens to be an app, it is right.",
    ],
  },
  {
    id: "install",
    title: "Install",
    body: [
      "Tailwind v4 projects take tokens.css directly. Tailwind v3 projects take tokens.hsl.css and point their config at the --hsl-* channels. Set the accent once on the root, and quiet mode if the product is data-dense.",
    ],
    code: `npx shadcn add https://ui.dylanfdl.com/r/tokens.json   # tokens + globals mapping
npx skills add dylanfernandezdelara/dfdl-ui              # the skill, for agents

<html data-accent="ember">          <!-- or "indigo" -->
<html data-accent="ember" data-quiet>  <!-- data-dense product -->`,
  },
  {
    id: "tokens",
    title: "Use semantic tokens only",
    body: [
      "Components touch the semantic tier and nothing else: bg-page, bg-surface, bg-surface-hover, bg-raised, text-fg, text-fg-secondary, text-fg-strong, border-line, bg-accent-solid, text-accent-text, outline-focus, elevation-raised, hairline. Primitives (neutral-light-7, ember-dark-9) are never used in a component; they exist so semantics can point at them.",
      "text-primary is shadcn's name for the accent fill, kept so stock components render. Body text is text-fg. Never text-primary for text.",
      "The linter enforces this: @shadcn/lint with no-raw-colors, no-arbitrary-values, no-inline-styles and no-restyle. If the linter is quiet, the tokens are right.",
    ],
  },
  {
    id: "type",
    title: "Type through roles",
    body: [
      "Six roles carry size, leading and weight together: text-display (32/40/400 Lora), text-title and text-heading (16/24/550 Lora), text-body (16/24/400), text-ui (13/20/450), text-caption (12/16/450). Set text only through a role. text-sm with leading-6 by hand is a defect.",
      "tabular-nums on anything that lines up. text-balance on titles, text-pretty on paragraphs. Do not invent sizes between roles.",
    ],
  },
  {
    id: "shape",
    title: "Shape and rhythm",
    body: [
      "Radius: rounded-xs 8 (chips), rounded-sm 10 (controls), rounded-md 12 (fields, popovers), rounded-lg 16 (cards), rounded-xl 24 (sheets), rounded-full. Nest concentrically: inner radius = outer radius minus the padding between.",
      "Control heights: 24, 28, 32 (default), 40, 48. Spacing in minor (8) and major (24). Vertical space between blocks is always a multiple of 8.",
      "Lines that would push content off the grid are hairline, hairline-t, hairline-b (shadows), not borders. items-center in rows, never items-baseline. Line-heights in px, multiples of 4.",
    ],
  },
  {
    id: "motion",
    title: "Motion",
    body: [
      "First ask whether it should animate. Keyboard-triggered and 100+/day actions do not. Hover and press are near-imperceptible. Occasional things (menus, dialogs, drawers) get the standard treatment.",
      "Curves: ease-out cubic-bezier(0.23, 1, 0.32, 1) for enter and exit; ease-in-out cubic-bezier(0.77, 0, 0.175, 1) for movement on screen; ease-drawer cubic-bezier(0.32, 0.72, 0, 1) for drawers; ease-spring only for gestures. Never ease-in, never built-in ease.",
      "Durations: instant 100 (tooltips), fast 150 (hover, press), normal 200 (menus, toasts), slow 300 (dialogs), slower 500 (drawers). Exits at 75% of the enter, same path. Press is scale 0.97.",
      "Only transform, translate, scale and opacity. Name the properties (transition-interactive, transition-icon), never transition: all. Popovers scale 0.95 from the trigger; dialogs 0.96 from center. Enters in @starting-style, exits in the closed state, display with allow-discrete. Reduced motion keeps opacity and color and drops movement.",
      "Verify by reading document.getAnimations() after the interaction (scripts/probes/animations.js). The CSS is not the proof.",
    ],
  },
  {
    id: "grid",
    title: "Measure the grid",
    body: [
      "Every block's top edge and every control's height land on the 8px grid; the 4px half-step is allowed only for centering a 24px line in a 48px row and for padding inside a control. Nothing fractional.",
      "Run scripts/probes/grid.js in the page (or press Shift+G on this site). Fix until strict offenders are zero. One 2px slip in a header shifts every row under it; the probe finds the first cause.",
    ],
  },
  {
    id: "quiet",
    title: "Quiet mode",
    body: [
      "Data-dense products, where color already carries data and headlines stack in lists, run with data-quiet on the root: headings and display go system sans, and the accent roles collapse into the neutrals so selection is carried by weight and hairlines. Neutrals, type sizes, radius, elevation and motion are unchanged. trackcongress.org is the reference.",
    ],
  },
  {
    id: "adopt",
    title: "Adopt an outside component",
    body: [
      "1. Bring the source in (npx shadcn add <url>, or copy). 2. Retoken: replace every color, radius, spacing and motion value with a semantic token until the linter is quiet. 3. Write the no-restyle contract: what callers may override. 4. Write the motion spec: purpose, curve, duration, exit, reduced-motion; verify with the probe. 5. Add it to registry.json with its dependencies and provenance. 6. Docs page with every state; Figma component. Core tier requires all six; expressive and app-pattern tiers may enter with 1 to 5.",
    ],
  },
  {
    id: "never",
    title: "Never",
    body: [
      "Pure white or pure black surfaces. A second accent in one product. A heading larger than 16px that is not display. transition: all. ease-in on anything. Animating width, height, top or left. Borders that push content off the grid. Unitless line-heights. A value that is not a token. Copying Emil's or Jakub's skills into this one; hand off to them instead.",
    ],
  },
]
