/**
 * Generates the color section of src/styles/tokens.css from the approved configuration.
 *
 *   node scripts/color/build-tokens.mts
 *
 * The configuration below is the Lab 1 decision (see decisions.md). Everything else in tokens.css
 * (rhythm, rounded, motion) is authored by hand and preserved verbatim.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { buildRamp, contrast, maxChroma, parse, toCss, type Appearance, type Ramp } from "./ramps.mts"

const here = dirname(fileURLToPath(import.meta.url))
const tokensPath = process.env.DFDL_TOKENS_OUT ?? resolve(here, "../../src/styles/tokens.css")
/* DFDL_ACCENT_PROPORTION overrides the accent vividness for experiments (1b). The approved value stays in config. */
const accentProportionOverride = process.env.DFDL_ACCENT_PROPORTION ? Number(process.env.DFDL_ACCENT_PROPORTION) : undefined

/* ---------- Approved configuration (Lab 1, 2026-09-19) ---------- */
export const config = {
  neutral: { hue: 80, chroma: 0.014 },
  /* Text lightness structure carried over from dylanfdl.com: soft body, ink headings. */
  text: {
    light: { fg: 0.373, fgSecondary: 0.551, fgTertiary: 0.714, fgStrong: 0.12 },
    dark: { fg: 0.885, fgSecondary: 0.68, fgTertiary: 0.58, fgStrong: 0.935 },
  },
  /* Approved accents. One per product, chosen at the root with data-accent; the first is the default.
     All share the solid step's lightness so they are interchangeable. Vividness is a proportion of each
     hue's own sRGB maximum at that lightness (better-colors: match vividness relatively, not absolutely).
     Dark is set per accent rather than derived: blue's chroma ceiling collapses at high lightness
     (0.274 at L 52%, 0.149 at L 72%), so one factor cannot serve every hue. Indigo dark keeps the
     vividness dylanfdl.com already shipped (0.12 chroma, 82% of ceiling). */
  accents: [
    { name: "ember", hue: 48, proportion: { light: accentProportionOverride ?? 0.6, dark: 0.55 } },
    { name: "indigo", hue: 281.25, proportion: { light: 0.452, dark: 0.8 } },
  ],
  accent: {
    /* Status ramps still derive dark from light with this factor. */
    darkFactor: 0.85,
    solidL: { light: 0.524, dark: 0.72 },
  },
  /* Status hues kept more than 15 degrees from the accent (48). */
  status: {
    danger: { hue: 18, proportion: 0.55 },
    success: { hue: 150, proportion: 0.45 },
    warning: { hue: 88, proportion: 0.6 },
  },
}

function neutral(appearance: Appearance) {
  const ramp = buildRamp({ kind: "neutral", appearance, hue: config.neutral.hue, chroma: config.neutral.chroma })
  const t = config.text[appearance]
  const textC = config.neutral.chroma * (appearance === "light" ? 1.4 : 1.1)
  const text = (l: number) => ({ mode: "oklch" as const, l, c: textC, h: config.neutral.hue })
  return { ramp, fg: text(t.fg), fgSecondary: text(t.fgSecondary), fgTertiary: text(t.fgTertiary), fgStrong: text(t.fgStrong) }
}

type AccentDef = (typeof config.accents)[number]
function accent(def: AccentDef, appearance: Appearance): Ramp {
  return buildRamp({ kind: "accent", appearance, hue: def.hue, chroma: def.proportion[appearance], solidL: config.accent.solidL[appearance] })
}

function status(name: keyof typeof config.status, appearance: Appearance): Ramp {
  const s = config.status[name]
  const proportion = appearance === "light" ? s.proportion : s.proportion * config.accent.darkFactor
  return buildRamp({ kind: "accent", appearance, hue: s.hue, chroma: proportion, solidL: config.accent.solidL[appearance] })
}

function accentSemantics(def: AccentDef, appearance: Appearance): string[] {
  const ak = (step: number) => `var(--${def.name}-${appearance}-${step})`
  return [
    `  --border-focus: ${ak(9)};`,
    `  --accent-bg: ${ak(3)};`,
    `  --accent-border: ${ak(6)};`,
    `  --accent-solid: ${ak(9)};`,
    `  --accent-solid-hover: ${ak(10)};`,
    `  --accent-text: ${ak(11)};`,
  ]
}

function rampVars(prefix: string, ramp: Ramp): string[] {
  return Object.entries(ramp).map(([step, c]) => `  --${prefix}-${step}: ${toCss(c)};`)
}

const defaultAccent = config.accents[0]
const L = { n: neutral("light"), a: accent(defaultAccent, "light"), danger: status("danger", "light"), success: status("success", "light"), warning: status("warning", "light") }
const D = { n: neutral("dark"), a: accent(defaultAccent, "dark"), danger: status("danger", "dark"), success: status("success", "dark"), warning: status("warning", "dark") }

function semantics(appearance: Appearance) {
  const x = appearance === "light" ? L : D
  const light = appearance === "light"
  const p = (k: string) => `var(--${k})`
  const nk = (step: number) => p(`neutral-${appearance}-${step}`)
  const ak = (step: number) => p(`${defaultAccent.name}-${appearance}-${step}`)
  const sk = (name: string, step: number) => p(`${name}-${appearance}-${step}`)
  const raised = light ? toCss({ mode: "oklch", l: 1, c: config.neutral.chroma * 0.3, h: config.neutral.hue }) : nk(3)
  return [
    `  --bg-page: ${nk(1)};`,
    `  --bg-subtle: ${nk(2)};`,
    `  --bg-surface: ${light ? nk(1) : nk(2)};`,
    `  --bg-surface-hover: ${nk(3)};`,
    `  --bg-surface-active: ${nk(4)};`,
    `  --bg-sunken: ${nk(3)};`,
    `  --bg-raised: ${raised};`,
    `  --bg-overlay: ${light ? "oklch(20% 0.01 80 / 0.12)" : "oklch(0% 0 0 / 0.5)"};`,
    "",
    `  --fg: ${toCss(x.n.fg)};`,
    `  --fg-secondary: ${toCss(x.n.fgSecondary)};`,
    `  --fg-tertiary: ${toCss(x.n.fgTertiary)};`,
    `  --fg-strong: ${toCss(x.n.fgStrong)};`,
    `  --fg-disabled: ${nk(8)};`,
    `  --fg-inverse: ${nk(1)};`,
    `  --fg-on-accent: ${nk(1)};`,
    "",
    `  --border-subtle: ${nk(5)};`,
    `  --border-default: ${nk(6)};`,
    `  --border-strong: ${nk(8)};`,
    `  --border-separator: ${nk(4)};`,
    `  --border-focus: ${ak(9)};`,
    "",
    `  --accent-bg: ${ak(3)};`,
    `  --accent-border: ${ak(6)};`,
    `  --accent-solid: ${ak(9)};`,
    `  --accent-solid-hover: ${ak(10)};`,
    `  --accent-text: ${ak(11)};`,
    "",
    ...(["danger", "success", "warning"] as const).flatMap((s) => [
      `  --status-${s}-bg: ${sk(s, 3)};`,
      `  --status-${s}-border: ${sk(s, 6)};`,
      `  --status-${s}: ${sk(s, 9)};`,
      `  --status-${s}-text: ${sk(s, 11)};`,
    ]),
    "",
    light
      ? `  --elevation-raised: 0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 2px 4px oklch(0 0 0 / 0.04);\n  --elevation-floating: 0 0 0 1px oklch(0 0 0 / 0.06), 0 10px 15px -3px oklch(0 0 0 / 0.08), 0 4px 6px -4px oklch(0 0 0 / 0.08);\n  --outline-image: oklch(0 0 0 / 0.1);`
      : `  --elevation-raised: inset 0 0 0 1px oklch(100% 0 0 / 0.04), 0 1px 1px oklch(0 0 0 / 0.24);\n  --elevation-floating: inset 0 0 0 1px oklch(100% 0 0 / 0.06), 0 16px 40px oklch(0 0 0 / 0.45);\n  --outline-image: oklch(100% 0 0 / 0.1);`,
  ]
}

const generated = [
  "/* ==== GENERATED by scripts/color/build-tokens.mts. Edit the config there, not these values. ==== */",
  ":root {",
  "  /* ---- Primitives: neutral, light ---- */",
  ...rampVars("neutral-light", L.n.ramp),
  "  /* ---- Primitives: neutral, dark ---- */",
  ...rampVars("neutral-dark", D.n.ramp),
  "  /* ---- Primitives: accents, light and dark ---- */",
  ...config.accents.flatMap((def) => [...rampVars(`${def.name}-light`, accent(def, "light")), ...rampVars(`${def.name}-dark`, accent(def, "dark"))]),
  "  /* ---- Primitives: status ---- */",
  ...rampVars("danger-light", L.danger),
  ...rampVars("danger-dark", D.danger),
  ...rampVars("success-light", L.success),
  ...rampVars("success-dark", D.success),
  ...rampVars("warning-light", L.warning),
  ...rampVars("warning-dark", D.warning),
  "",
  "  /* ---- Semantics: light ---- */",
  ...semantics("light"),
  "}",
  "",
  ".dark {",
  ...semantics("dark"),
  "}",
  "",
  "/* ---- Accent selection: data-accent on the root picks one approved accent for the whole product ---- */",
  ...config.accents.flatMap((def) => [
    `[data-accent="${def.name}"] {`,
    ...accentSemantics(def, "light"),
    "}",
    `.dark[data-accent="${def.name}"], [data-accent="${def.name}"] .dark, .dark [data-accent="${def.name}"] {`,
    ...accentSemantics(def, "dark"),
    "}",
  ]),
  "/* ==== END GENERATED ==== */",
].join("\n")

const src = readFileSync(tokensPath, "utf8")
const start = src.indexOf("/* ==== GENERATED")
const endMarker = "/* ==== END GENERATED ==== */"
const end = src.indexOf(endMarker)
if (start === -1 || end === -1) throw new Error("tokens.css is missing the GENERATED markers")
const out = src.slice(0, start) + generated + src.slice(end + endMarker.length)
writeFileSync(tokensPath, out)

/* ---------- Report ---------- */
const report = {
  accents: Object.fromEntries(config.accents.map((def) => [def.name, {
    light: toCss(accent(def, "light")[9]),
    dark: toCss(accent(def, "dark")[9]),
    onSolid: { light: contrast(L.n.ramp[1], accent(def, "light")[9]), dark: contrast(D.n.ramp[1], accent(def, "dark")[9]) },
    maxChromaAtSolid: maxChroma(config.accent.solidL.light, def.hue).toFixed(3),
  }])),
  contrast: {
    light: {
      fgOnPage: contrast(L.n.fg, L.n.ramp[1]),
      fgSecondaryOnPage: contrast(L.n.fgSecondary, L.n.ramp[1]),
      fgTertiaryOnPage: contrast(L.n.fgTertiary, L.n.ramp[1]),
      onAccentOnSolid: contrast(L.n.ramp[1], L.a[9]),
      accentTextOnAccentBg: contrast(L.a[11], L.a[3]),
      dangerTextOnPage: contrast(L.danger[11], L.n.ramp[1]),
      warningTextOnPage: contrast(L.warning[11], L.n.ramp[1]),
      successTextOnPage: contrast(L.success[11], L.n.ramp[1]),
    },
    dark: {
      fgOnPage: contrast(D.n.fg, D.n.ramp[1]),
      fgSecondaryOnPage: contrast(D.n.fgSecondary, D.n.ramp[1]),
      fgTertiaryOnPage: contrast(D.n.fgTertiary, D.n.ramp[1]),
      onAccentOnSolid: contrast(D.n.ramp[1], D.a[9]),
      accentTextOnAccentBg: contrast(D.a[11], D.a[3]),
      dangerTextOnPage: contrast(D.danger[11], D.n.ramp[1]),
      warningTextOnPage: contrast(D.warning[11], D.n.ramp[1]),
      successTextOnPage: contrast(D.success[11], D.n.ramp[1]),
    },
  },
  hueDistanceFromAccents: Object.fromEntries(config.accents.map((a) => [a.name, Object.fromEntries(Object.entries(config.status).map(([k, v]) => [k, Math.min(Math.abs(v.hue - a.hue), 360 - Math.abs(v.hue - a.hue))]))])),
}
console.log(JSON.stringify(report, null, 2))
void parse
