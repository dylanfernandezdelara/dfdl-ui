# Inspiration audit

Measured 2026-09-15 by rendering each site at 1440x900 in Chromium, light and dark, and reading computed styles from the DOM. Screenshots and the raw extraction are in `inspo/`. Values below are what the browser reported, not what the sites say about themselves.

## Per site

### dylanfdl.com (the starting point)
- Text: system-ui 14px/24px at weight 450 for page prose; list items 14/24 at 400; tabs 14 at 500; dates 12/16. Articles: 15/24 body, sans headings at 600 (20 and 17), Lora 28/32 title. Page title: Lora 24px/32px weight 400. Only one serif element on the homepage.
  - Corrected 2026-09-25. This line first read "Body: 16px/24px", taken from the `<body>` element's default rather than the paragraphs (the raw `p` entry in `inspo/computed-styles.json` always said 14/24 at 450). That error became the dfdl body size until Dylan saw the result.
- Light: page `oklch(99.6% 0.008 99)`, text `oklch(37% 0.03 260)`. Warm cream surface, cool slate text. Dark: page `oklch(22% 0.007 75)`, text `oklch(88.5% 0.014 85)`, both warm.
- Links: underlined, underline color at 22% alpha, offset 2px. Accent orange used once, as a word.
- Radii: 6px and 4px only. One shadow on the whole page (a 1px ring). Cards are hairline-bordered surfaces one step darker than the page.
- Motion: 150–300ms, Tailwind default curves, one `cubic-bezier(0.16, 1, 0.3, 1)`.
- Measure: 528px reading column, 624px and 896px containers.
- Read: editorial, quiet, warm. Almost no chrome. This is the temperament to keep.

### benji.org
- Inter 14px/20px everywhere, weight 460 (variable font, not 400). Headings are 14px weight 500 with -0.09px tracking. Titles and body are the same size; hierarchy comes from color.
- Two text colors: `#111` and `rgba(0,0,0,0.4)`. That is the entire palette on the index page.
- Zero radii on the index, no shadows, no backgrounds. Hairline rows at `#f2f2f2`.
- Measure: 582px.
- Liveline page: same type, SF Mono 12.6px for code and axis labels, pill buttons at 999px radius 22px tall, 11px weight 600 when active. Chart accent is a single orange; everything else neutral.
- Read: the most reductive site in the set. Proves you can build a whole documentation page from one size, two colors and a hairline. Nearest to dylanfdl.com in temperament, cooler and denser.

### ui.kitze.io
- Geist 16px/24px, Geist Mono for labels and commands. H1 48px weight 600 tracking -1.2px. Small caps mono labels at 10–11px with wide tracking (`LIVE COMPONENT`, `START SOMEWHERE GOOD`).
- Light page `rgb(249,248,245)` (warm off-white), text `rgb(28,34,31)` (green-tinted near black), secondary `rgb(105,114,108)`. Border `rgb(223,221,216)`. Dark page `rgb(21,25,23)`.
- Accent: one lime-green `lab(90 -36 69)` used as a tinted fill for the primary action and the active sidebar row, with dark green text on it. No filled blue anywhere.
- Radii: 6px dominant (81 uses), 8px, 12px, full. Shadows effectively none; depth is borders and one-step surface shifts.
- Motion: 150ms `cubic-bezier(0.4,0,0.2,1)` on everything. Tailwind default.
- Read: warm neutrals plus one unexpected accent, mono for metadata, bordered surfaces. The docs-site layout (sidebar with counts, breadcrumb, live preview card, install command block, "Copy for agents") is the reference for ui.dfdl's shell.

### interfacecraft.dev
- Body system-ui 16px, paragraphs 18px/26px in a warm gray `lab(48 2 4)`. Display face Signifier 50px weight 400, tracking -1.25px. Serif display over system sans body.
- Pure white page, near-black text. Warm gray secondary text. Cards use saturated flat fills (orange, blue, mint, cream, charcoal) with serif titles.
- Radii 16px on cards, pills for buttons. Buttons 52px tall, 18px text.
- Motion includes `cubic-bezier(0.34,1.56,0.64,1)` (overshoot) at 400ms on the card fan. Playful where it counts, plain elsewhere.
- Below the fold (`inspo/interfacecraft-scroll*.png`): 540px measure, sections separated by a short centered 70px hairline rather than a heading size jump, emphasis words underlined in the text color rather than colored, testimonial quotes set in the serif, hairline-bordered preview cards at 16px, and a single light-gray pill (`Login`) as the only chrome button. The library itself is behind a paid login and was not audited.
- Read: serif display plus system body is the same pairing as dylanfdl.com, executed at larger scale. Shows how far a warm-gray secondary can go before it reads brown. With benji and jakub, it is the third site in the set proving that hairlines and one serif carry an entire editorial page.

### dialkit.dev
- Custom sans 128px weight 450 tracking -2.56px display; ui-monospace and system-ui for controls; SF Pro Text in the panel.
- Page `#111`, text white, secondary `rgb(212,212,212)` and `rgb(163,163,163)`. Pure neutral, no tint.
- Radii 999px pills dominate, then 8/6/7/4px. Panels have inset white highlights (`rgba(255,255,255,0.38) 0 1px 0 inset`) and a 1px white ring at 8% alpha, plus a 24px/58px drop shadow. This is the "glass control" recipe.
- Motion 140–200ms, all `ease`.
- Read: the control-panel aesthetic. Inset top highlight plus faint outer ring is worth stealing for dark-mode raised surfaces.

### libraries.dev/gooey
- Inter 16px body, 13px UI text, Saans 36px display weight 500. Roboto Mono for code.
- Page `#121212`, text white, secondary `rgba(202,202,202,0.7)`. Surfaces are white at 4–8% alpha rather than separate grays.
- Radii 8/12/16px and 36–50px pills. Shadows: `0 1px 1px rgba(0,0,0,.24)` plus `inset 0 0 0 1px rgba(255,255,255,.04)`. Same recipe as DialKit at lower intensity.
- Motion: `cubic-bezier(0.22,1,0.36,1)` at 120–200ms, and `scale` in the transition list on buttons. Press feedback is built in.
- Read: alpha-white layering for dark surfaces. Every raised element is "the page plus a few percent white plus a hairline".

### beautifului.dev
- Inter 14px/21px body, 13px dominant UI size, weight 500 dominant (1970 uses versus 1001 at 400). H1 21px weight 600.
- Page `oklch(22.6% 0.004 264)`, text `oklch(96.4% 0.002 248)`, secondary `oklch(54% 0.01 264)`. Cool near-neutral. Accent blue `oklch(79% 0.11 248)` for links and logo only.
- Radii 8px and 6px dominant, pills for segmented controls.
- Motion: `ease-out` 120ms on most, `cubic-bezier(0.23,1,0.32,1)` at 140ms on some. Shortest durations in the set.
- Read: the AI-native component catalogue. Dense (13px), medium-weight, cool dark. Section numbering (`01 Loading State`) and the tabbed variant switcher inside each demo card are patterns to reuse.

### elements.ai-sdk.dev
- Geist 16px/24px, Geist Mono heavily used (2239 elements, mostly code demos). H1 60px weight 600 tracking -1.5px, `text-wrap: balance`. Lead paragraph 20px/28px.
- Pure white / pure black pages. Borders `lab(91 0 0)` light, `white/10%` dark. Blue `lab(48 22 -87)` filled primary button.
- Radii 8px, 10px, 4px, full. No shadows. Bordered grid sections with 1px dividers between feature columns.
- Motion 150ms Tailwind curve, `transition: all` on buttons (a thing to avoid).
- Read: the shadcn house style. Cool, borderless-to-bordered, a blue CTA. Useful as the registry and docs architecture reference, not as a visual target.

### grainient.supply
- SF Pro Rounded 48px display, 12–16px body. Pure black page.
- Lime `rgb(194,241,60)` pill CTA, white pill secondary. Radii 5/15/50px.
- Shadows are the interesting part: `inset 0 0.5px 0.5px rgba(255,255,255,.4)` top highlight plus `0 70px 30px rgba(0,0,0,.05)` and a 40px lime glow on the CTA. Hero is a full-bleed noisy gradient.
- Read: texture and glow. A grain overlay on a dark gradient reads premium where flat black reads cheap. Relevant to the expressive tier only.

### jakub.kr
- Inter variable 16px/26px, weights 400/450/500/550 (uses the variable axis, not the standard stops). Berkeley Mono for code, Libre Baskerville italic for emphasis words.
- Light page `#fcfcfc`, text `lab(12 0 0)`, secondary `lab(28 0 0)` and `lab(55 0 0)`. Dark page `#101010`. Pure neutral both ways.
- H1 is 16px weight 550. Section headings same size with a hairline rule extending to the right. Article measure 692px.
- Radii: pills for buttons, 8px cards. Shadow: `0 0 0 1px rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.06)` light; `0 0 0 1px rgba(255,255,255,.08)` dark.
- Motion: 200ms `ease-out`, `scale` in the transition list on buttons.
- Read: the type discipline is the lesson. One size for headings and body, weight and color carry hierarchy, italic serif for a single emphasized word. The 1px-ring-plus-tiny-drop shadow recipe is the lightest shadow in the set and the one to adopt for light mode.

### oklch.fyi
- Same system as jakub.kr (same author): Inter variable, Berkeley Mono 14px code with 6px radius, 40px H1 weight 600 tracking -1px, 18px/28px lead, 672px measure.
- Buttons 32px tall, 14px weight 500, `cubic-bezier(0,0,0.2,1)` 150ms, `scale` in transition list. Filled primary is near-black, not a hue.
- Radii 12px cards, pills, 6px and 8px.
- Read: a working app shell (sidebar, three-way theme toggle, search) in the same reductive language as the blog. Shows that the jakub system scales from article to tool.

## Cross-cutting patterns

**Type.** Every site uses one sans for everything and a mono for code and metadata. Serif appears only as display (Interface Craft, dylanfdl) or as a single emphasized word (jakub). Body is 14–16px; UI text is 13–14px; the densest catalogues (beautifului, benji) run 13px at weight 460–500 rather than 400. Heading tracking is consistently negative and proportional: -0.02em to -0.025em at 36px and up. Nobody uses more than three weights on a page.

**Color.** Two families. Warm off-white plus tinted near-black (kitze `249,248,245` / `28,34,31`; dylanfdl cream / slate) and pure neutral (benji, jakub, oklch, dialkit, gooey). Secondary text is either a lighter gray or the primary at 40–75% alpha. Every site has exactly one accent and most use it for one thing: kitze's lime marks the primary action and the active row, benji's orange is only in the chart, dylanfdl's orange is one word. Filled blue CTAs appear only on the Vercel property.

**Surfaces.** Light mode: hairline border (`~lab(91)`) or a 1px ring shadow at 6% black. Dark mode: page plus 4–8% white, with an inset 1px white ring at 4–8% and optionally a 0.5–1px inset top highlight (dialkit, grainient, gooey). Big soft drop shadows appear only on floating panels. Nobody uses shadows for cards in a flow.

**Radius.** 6px or 8px is the base everywhere. 12–16px for cards and panels. Full pills for segmented controls, chips and secondary buttons on the darker sites. 4px for inline code and small badges.

**Motion.** 120–200ms on interactive state. Curves: Tailwind default `(0.4,0,0.2,1)` on the shadcn-derived sites, `ease-out` or `(0,0,0.2,1)` on jakub's, `(0.22,1,0.36,1)` on gooey, `(0.23,1,0.32,1)` on beautifului. The sites that feel best (jakub, gooey, oklch) list `scale` in `transition-property` on buttons, meaning press feedback is a first-class state. Overshoot curves appear only on marketing moments (Interface Craft's card fan).

**Layout.** Reading columns 528–692px. App content 1024–1280px max. Sidebar plus content plus optional right rail. Section headings with a trailing hairline rule (benji, jakub) rather than a size jump. Mono small-caps eyebrows at 10–11px with wide tracking for section labels (kitze).

## Motion and states (second pass, agent-browser)

Captured by driving each site with `agent-browser` and reading `document.getAnimations()` at the moment of interaction, so these are the animations that actually ran, including keyframe easings, not the CSS declared on idle elements. Sites whose motion is JS-driven (Motion springs) show as inline transform updates rather than CSS animations and are noted as such.

### Kitze UI (Base UI + Tailwind)
- **Dialog enter**: overlay `opacity 0→1` 200ms `(0.4,0,0.2,1)`; content `opacity 0→1` + `scale 0.95→1` 200ms `(0,0,0.2,1)`. Exit is the exact mirror, same duration. Content is 425px, radius 16px, padding 24px, 1px border `rgb(223,221,216)`, shadow `0 10px 15px -3px black/10%, 0 4px 6px -4px black/10%` (Tailwind `shadow-lg`).
- **Bottom drawer enter**: backdrop `opacity` 300ms `(0.4,0,0.2,1)`; sheet `translate 0 100% → 0` 300ms `(0,0,0.2,1)`. Exit mirrors.
- **Dropdown enter/exit**: `opacity` + `scale 0.95↔1` 150ms `(0,0,0.2,1)`, `transform-origin` set to the trigger. Popover is pure white on the cream page, `shadow-lg` at 5% alpha, min-width 128px, items 36px tall at 14px. Highlighted item is a translucent light fill; item color transitions run at 78ms.
- **Buttons**: hover adds `0 1px 2px black/5%` and a one-step lighter fill, 150ms. No scale on press.
- Read: consistent, symmetric, Tailwind-default. Nothing surprising, nothing wrong. It is the floor, not the target.

### libraries.dev/gooey
- **Buttons**: `bg white/6%` → hover `white/10%` 140ms `ease`. Shadow `0 1px 1px black/24%, inset 0 0 0 1px white/4%, inset 0 1px 0 white/6%`. 32px tall, 13px weight 500. Press does not scale on this button; the primary "Send feedback" button has `scale` in its transition list at 120ms `(0.22,1,0.36,1)`.
- **Menu open**: icons cross-fade with `filter blur(2px)→0` + `opacity 0→1` over 180ms `ease`; the plus rotates 45° over 250ms `ease-in-out`. Item positions are JS-driven inline `transform: translate()` with `will-change: transform` and `transition: all`, so the merge motion is a spring, not a CSS curve.
- **Goo filter recipe**: `feGaussianBlur stdDeviation=6` → `feColorMatrix` alpha row `0 0 0 18 -7` → `feComposite operator=atop` with the source graphic on top so text stays crisp. Accent `#55cfff`, hover `#74d8ff`.
- Read: the blur-plus-opacity icon swap and the inset-highlight button are the two reusable pieces. The goo itself is an expressive-tier component.

### jakub.kr
- **Button at rest** (light): `bg lab(96.75)`, 40px tall, 16px weight 500, pill. Shadow `0 0 0 1px black/6%, 0 1px 2px -1px black/6%, 0 2px 4px black/4%`. Transition list is `color, background-color, border-color, box-shadow, scale` at 200ms `ease-out`.
- **Press**: background goes to white over 200ms `ease-out`. Scale is in the transition list but this particular demo button did not scale on mousedown in headless Chrome; treat the 0.97 press as a convention of his skill rather than a measurement here.
- Read: the three-layer light shadow is the one to adopt. It reads as a hairline plus a hint of lift, never as a drop shadow.

### beautifului.dev
- **Vocabulary**: two keyframe animations do almost everything. `fade-up` is `opacity 0→1` + `translateY(8px)→0`, 300–600ms; `pop-in` is `opacity 0→1` + `scale(0.95)→1`, 180–300ms. Both use keyframe easing `cubic-bezier(0.23,1,0.32,1)`. Sections use 600ms, children 300–450ms, giving a natural stagger without explicit delays.
- **Thinking collapse/expand**: `grid-template-rows` transition 400ms `(0.23,1,0.32,1)` with `opacity` on the content, chevron `rotate 180deg` 300ms `(0.4,0,0.2,1)`.
- **Segmented control**: 21px tall, 11.5px weight 500, pill. Selected state gets `bg oklch(26% 0.006 271)` and shadow `0 0 0 1px white/10%, 0 1px 2px black/30%`; switch is 150ms on `background-color, box-shadow, color`, no sliding indicator. Panel height change is a 500ms `height` transition (layout property; it works because the panel is small).
- **Loaders**: pixel grid `opacity 0.15↔1` 650ms linear steps; shimmer is `background-position 150%→-50%` 1400ms linear; spinner 1100ms linear.
- Read: one strong ease-out curve, two named animations, per-level durations. This is the most transferable motion system in the set and it is entirely CSS.

### dialkit.dev
- **Glass panels**: container `bg rgba(4,4,4,0.12)`, `backdrop-filter: blur(5px) saturate(2) url(#lg-mat…)` (an SVG displacement map for refraction), radius 36px, shadow `0 24px 58px black/14.5%`. An inner layer carries `inset 0 1px 0 white/38%, inset 0 0 0 1px white/8%`. Active state is a `color(srgb 0.98 0.98 1 / 0.2)` fill with the same backdrop filter.
- **Toggle**: triggers `hero-composition-enter` 800ms `(0.22,1,0.36,1)`, `opacity 0→1` + `scale 0.9→1`. The panel wobble itself is JS.
- Read: the inset top highlight at ~38% white is what sells the glass. Everything else is expensive (backdrop filters and displacement maps) and belongs only on floating controls in the expressive tier.

### interfacecraft.dev
- Card fan is Motion springs (`MotionIsMounted` global, inline `translateX/Y rotate` per card, hero container animates `filter: blur` and `opacity`). Card titles transition `font-size, line-height` 400ms `(0.34,1.56,0.64,1)`, the only overshoot curve measured in the set, on a marketing hero.

### dylanfdl.com (baseline for "evolve")
- **Segmented tabs**: 28px tall, 14px weight 500, text-only color change 300ms `(0,0,0.2,1)`. The sliding indicator animates `left` and `width` at 450ms `(0.16,1,0.3,1)`.
- **"optimist"**: 15s looping hue cycle through warm reds/oranges at `oklch(66–71% 0.18–0.23 17–35)`.
- Read: two things to fix in the evolution. The indicator animates layout properties, which paint on the main thread and read slow at 450ms; it should be a `transform` at ≤250ms. And the 300ms color transition on tabs is above the 150ms ceiling the rest of the set uses for high-frequency hover.

### Cross-cutting, motion
- **Enter/exit pairs** are symmetric everywhere except beautifului, whose exits are plain. Nobody makes the exit faster than the enter, which is what Emil and Jakub both recommend. That is an opportunity, not a convention to copy.
- **Scale-from** is 0.95 in every measured case (kitze dialog and menu, beautifului pop-in, dialkit enter uses 0.9). 0.97 on press is the skills' number (0.96 is Emil's modal scale-from), not something the sites measured here do.
- **Durations by frequency**: 78–150ms for item highlight and hover, 150ms menus, 200ms dialogs, 300ms drawers, 300–600ms for one-time section entrances. Only dialkit's marketing enter exceeds 600ms.
- **Curves**: the three that matter are Tailwind's `(0,0,0.2,1)` (kitze, dylanfdl), gooey's `(0.22,1,0.36,1)`, and beautifului's `(0.23,1,0.32,1)`. The last two are nearly identical strong ease-outs. The lab should compare `(0,0,0.2,1)` against `(0.22,1,0.36,1)` and be done.
- **Blur as a transition channel** appears on gooey's icons (2px) and interfacecraft's hero (`filter: blur`). Cheap on small elements, expensive on large ones.

## Implications for ui.dfdl

1. Keep dylanfdl.com's temperament (warm cream, quiet, editorial) and kitze's tinted-dark counterpart. These are the two sites in the set that share a warm neutral, and they prove it works for both a personal page and a component catalogue.
2. Adopt jakub's type discipline for the docs and app tiers: one body size, weight and color for hierarchy, negative tracking on display, mono for metadata. Keep Lora for display and the occasional italic emphasis word, not for headings inside UI.
3. One accent, used for the primary action and selection only. Candidates in the lab should be tested the kitze way, as a tinted fill with dark text, and the shadcn way, as a solid fill with light text, since those read very differently.
4. Depth recipe: light mode uses jakub's `0 0 0 1px black/6%, 0 1px 2px -1px black/6%`; dark mode uses gooey's `inset 0 0 0 1px white/4%` over a page-plus-4% surface, with dialkit's inset top highlight reserved for floating controls.
5. Radius base 6px, cards 12px, pills for segmented and chips. Concentric nesting enforced.
6. Motion: adopt beautifului's two-animation vocabulary (`fade-up` 8px and `pop-in` from 0.95) with per-frequency durations (hover ≤150ms, menu 150ms, dialog 200ms, drawer 300ms, one-time entrance 300–600ms). Curve to be picked in the lab between `(0,0,0.2,1)` and `(0.22,1,0.36,1)`. Make exits ~25% shorter than enters, which none of the reference sites do. `scale` in every button's transition list. Blur 2px→0 for icon swaps. No overshoot outside marketing. Nothing animates `left`, `width` or `height` except small disclosure panels via `grid-template-rows`.
7. Docs shell borrows kitze's structure and beautifului's numbered sections with in-card variant tabs.
8. The expressive tier (grain, glow, gooey) is opt-in and lives behind its own registry items so the core never carries it.
