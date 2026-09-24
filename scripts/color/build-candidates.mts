/**
 * Builds the Lab 1 candidates: CSS overrides scoped by data attributes, plus measured contrast pairs.
 *
 *   node scripts/color/build-candidates.mts
 *
 * Candidate A for every axis is the current tokens.css (dylanfdl.com values) and needs no override;
 * the lab renders it by leaving the data attribute at "a". B and C are computed here so the only
 * thing varying inside an axis is the thing being decided.
 */
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { buildRamp, contrast, maxChroma, parse, pinSolid, toCss, toHex, type Appearance, type Ramp } from "./ramps.mts"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "../..")

/* ---------- Baseline (candidate A) values, for measurement only ---------- */
const baseline = {
  light: {
    page: parse("oklch(99.61% 0.008 98.87)"),
    surface: parse("oklch(97.85% 0.0108 95.16)"),
    fg: parse("oklch(37.29% 0.0306 259.73)"),
    fgSecondary: parse("oklch(55.1% 0.0234 264.36)"),
    fgTertiary: parse("oklch(71.37% 0.0192 261.32)"),
    fgStrong: parse("oklch(9.69% 0 0)"),
    accentSolid: parse("oklch(52.4% 0.1237 281.25)"),
    accentBg: parse("oklch(95% 0.03 281)"),
    accentText: parse("oklch(45% 0.12 281)"),
    onAccent: parse("oklch(99.61% 0.008 98.87)"),
  },
  dark: {
    page: parse("oklch(22.2% 0.007 75)"),
    surface: parse("oklch(24% 0.008 75)"),
    fg: parse("oklch(88.5% 0.014 85)"),
    fgSecondary: parse("oklch(68% 0.018 78)"),
    fgTertiary: parse("oklch(58% 0.015 78)"),
    fgStrong: parse("oklch(93.5% 0.012 85)"),
    accentSolid: parse("oklch(72% 0.12 278)"),
    accentBg: parse("oklch(30% 0.05 278)"),
    accentText: parse("oklch(82% 0.1 278)"),
    onAccent: parse("oklch(22.2% 0.007 75)"),
  },
}

/* ---------- Neutral candidates ---------- */
/** Text lightness is held at dylanfdl's structure so temperature is the only variable. */
const TEXT_L = {
  light: { fg: 0.373, fgSecondary: 0.551, fgTertiary: 0.714, fgStrong: 0.12 },
  dark: { fg: 0.885, fgSecondary: 0.68, fgTertiary: 0.58, fgStrong: 0.935 },
}

type NeutralCandidate = { id: "b" | "c"; name: string; note: string; hue: number; chroma: number }
const neutrals: NeutralCandidate[] = [
  {
    id: "b",
    name: "Unified warm",
    note: "Surfaces and text share one warm hue (kitze's approach, but warm instead of green). Text stops being cool slate.",
    hue: 80,
    chroma: 0.014,
  },
  {
    id: "c",
    name: "Near neutral",
    note: "A trace of warmth only (jakub, benji, dialkit). Reads technical and quiet; the accent does all the color work.",
    hue: 80,
    chroma: 0.003,
  },
]

function neutralVars(c: NeutralCandidate, appearance: Appearance) {
  const ramp = buildRamp({ kind: "neutral", appearance, hue: c.hue, chroma: c.chroma })
  const t = TEXT_L[appearance]
  const text = (l: number) => ({ mode: "oklch" as const, l, c: c.chroma * (appearance === "light" ? 1.4 : 1.1), h: c.hue })
  const raised = appearance === "light" ? { mode: "oklch" as const, l: 1, c: c.chroma * 0.3, h: c.hue } : ramp[3]
  const vars: Record<string, string> = {
    "--bg-page": toCss(ramp[1]),
    "--bg-subtle": toCss(ramp[2]),
    "--bg-surface": toCss(appearance === "light" ? ramp[1] : ramp[2]),
    "--bg-surface-hover": toCss(ramp[3]),
    "--bg-surface-active": toCss(ramp[4]),
    "--bg-sunken": toCss(ramp[3]),
    "--bg-raised": toCss(raised),
    "--fg": toCss(text(t.fg)),
    "--fg-secondary": toCss(text(t.fgSecondary)),
    "--fg-tertiary": toCss(text(t.fgTertiary)),
    "--fg-strong": toCss(text(t.fgStrong)),
    "--fg-disabled": toCss(ramp[8]),
    "--fg-inverse": toCss(ramp[1]),
    "--fg-on-accent": toCss(ramp[1]),
    "--border-subtle": toCss(ramp[5]),
    "--border-default": toCss(ramp[6]),
    "--border-strong": toCss(ramp[8]),
    "--border-separator": toCss(ramp[4]),
  }
  const measured = {
    page: ramp[1],
    surface: appearance === "light" ? ramp[1] : ramp[2],
    fg: text(t.fg),
    fgSecondary: text(t.fgSecondary),
    fgTertiary: text(t.fgTertiary),
    fgStrong: text(t.fgStrong),
  }
  return { vars, ramp, measured }
}

/* ---------- Accent candidates, matched lightness and relative chroma ---------- */
const brand = baseline.light.accentSolid
const brandProportion = brand.c! / maxChroma(brand.l, brand.h!)

type AccentCandidate = { id: "a" | "b" | "c"; name: string; note: string; hue: number }
const accents: AccentCandidate[] = [
  { id: "a", name: "Indigo", note: "Current dylanfdl.com blue, pinned exactly on the solid step.", hue: brand.h! },
  { id: "b", name: "Ember", note: "The warm hue already in the site's rainbow word and in Interface Craft's cards. Same lightness, same relative vividness.", hue: 48 },
  { id: "c", name: "Moss", note: "A calm green near kitze's lime family, desaturated to match. Same lightness, same relative vividness.", hue: 150 },
]

function accentVars(c: AccentCandidate, appearance: Appearance, neutralPage: string) {
  const proportion = appearance === "light" ? brandProportion : brandProportion * 0.85
  const solidL = appearance === "light" ? brand.l : baseline.dark.accentSolid.l
  let ramp: Ramp = buildRamp({ kind: "accent", appearance, hue: c.hue, chroma: proportion, solidL })
  if (c.id === "a" && appearance === "light") ramp = pinSolid(ramp, brand)
  if (c.id === "a" && appearance === "dark") ramp = pinSolid(ramp, baseline.dark.accentSolid)
  const vars: Record<string, string> = {
    "--accent-bg": toCss(ramp[3]),
    "--accent-border": toCss(ramp[6]),
    "--accent-solid": toCss(ramp[9]),
    "--accent-solid-hover": toCss(ramp[10]),
    "--accent-text": toCss(ramp[11]),
    "--border-focus": toCss(ramp[9]),
    "--fg-on-accent": neutralPage,
  }
  return { vars, ramp }
}

/* ---------- Depth candidates ---------- */
const depths = [
  {
    id: "b",
    name: "Hairline only",
    note: "No shadows anywhere. Structure from 1px borders and one-step surface shifts (benji, kitze).",
    light: { raised: "0 0 0 1px var(--border-default)", floating: "0 0 0 1px var(--border-default)" },
    dark: { raised: "0 0 0 1px var(--border-default)", floating: "0 0 0 1px var(--border-strong)" },
  },
  {
    id: "c",
    name: "Lit edge",
    note: "Dialkit's inset top highlight on raised surfaces, a soft long drop only on floating ones.",
    light: {
      raised: "inset 0 1px 0 oklch(100% 0 0 / 0.7), 0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px oklch(0 0 0 / 0.05)",
      floating: "inset 0 1px 0 oklch(100% 0 0 / 0.7), 0 0 0 1px oklch(0 0 0 / 0.06), 0 24px 58px oklch(0 0 0 / 0.12)",
    },
    dark: {
      raised: "inset 0 1px 0 oklch(100% 0 0 / 0.16), inset 0 0 0 1px oklch(100% 0 0 / 0.06), 0 1px 1px oklch(0 0 0 / 0.3)",
      floating: "inset 0 1px 0 oklch(100% 0 0 / 0.22), inset 0 0 0 1px oklch(100% 0 0 / 0.08), 0 24px 58px oklch(0 0 0 / 0.5)",
    },
  },
] as const

/* ---------- Emit ---------- */
const css: string[] = [
  "/* Generated by scripts/color/build-candidates.mts. Do not edit; edit the script. */",
  "/* Candidate A on every axis is tokens.css itself. */",
]
const report: Record<string, unknown> = { brandProportion: Number(brandProportion.toFixed(3)), neutrals: {}, accents: {}, depths: {} }

for (const n of neutrals) {
  const light = neutralVars(n, "light")
  const dark = neutralVars(n, "dark")
  css.push(`[data-neutral="${n.id}"] {`, ...Object.entries(light.vars).map(([k, v]) => `  ${k}: ${v};`), "}")
  css.push(`.dark [data-neutral="${n.id}"], [data-neutral="${n.id}"].dark {`, ...Object.entries(dark.vars).map(([k, v]) => `  ${k}: ${v};`), "}")
  ;(report.neutrals as Record<string, unknown>)[n.id] = {
    name: n.name,
    note: n.note,
    hue: n.hue,
    chroma: n.chroma,
    light: { ramp: Object.values(light.ramp).map(toHex), contrast: measureNeutral(light.measured) },
    dark: { ramp: Object.values(dark.ramp).map(toHex), contrast: measureNeutral(dark.measured) },
  }
}
;(report.neutrals as Record<string, unknown>).a = {
  name: "Current",
  note: "dylanfdl.com today: warm cream surfaces, cool slate text.",
  light: { contrast: measureNeutral(baseline.light) },
  dark: { contrast: measureNeutral(baseline.dark) },
}

for (const a of accents) {
  const light = accentVars(a, "light", "var(--bg-page)")
  const dark = accentVars(a, "dark", "var(--bg-page)")
  if (a.id !== "a") {
    css.push(`[data-accent="${a.id}"] {`, ...Object.entries(light.vars).map(([k, v]) => `  ${k}: ${v};`), "}")
    css.push(`.dark [data-accent="${a.id}"], [data-accent="${a.id}"].dark {`, ...Object.entries(dark.vars).map(([k, v]) => `  ${k}: ${v};`), "}")
  }
  ;(report.accents as Record<string, unknown>)[a.id] = {
    name: a.name,
    note: a.note,
    hue: a.hue,
    light: {
      solid: toCss(light.ramp[9]),
      ramp: Object.values(light.ramp).map(toHex),
      contrast: {
        onAccentOnSolid: contrast(baseline.light.page, light.ramp[9]),
        accentTextOnAccentBg: contrast(light.ramp[11], light.ramp[3]),
        accentTextOnPage: contrast(light.ramp[11], baseline.light.page),
      },
    },
    dark: {
      solid: toCss(dark.ramp[9]),
      ramp: Object.values(dark.ramp).map(toHex),
      contrast: {
        onAccentOnSolid: contrast(baseline.dark.page, dark.ramp[9]),
        accentTextOnAccentBg: contrast(dark.ramp[11], dark.ramp[3]),
        accentTextOnPage: contrast(dark.ramp[11], baseline.dark.page),
      },
    },
  }
}

for (const d of depths) {
  css.push(`[data-depth="${d.id}"] {`, `  --elevation-raised: ${d.light.raised};`, `  --elevation-floating: ${d.light.floating};`, "}")
  css.push(`.dark [data-depth="${d.id}"], [data-depth="${d.id}"].dark {`, `  --elevation-raised: ${d.dark.raised};`, `  --elevation-floating: ${d.dark.floating};`, "}")
  ;(report.depths as Record<string, unknown>)[d.id] = { name: d.name, note: d.note }
}
;(report.depths as Record<string, unknown>).a = {
  name: "Ring and lift",
  note: "Current: jakub's 1px ring plus a small lift in light; gooey's inset white ring in dark.",
}

function measureNeutral(m: { page: Parameters<typeof contrast>[0]; surface: Parameters<typeof contrast>[0]; fg: Parameters<typeof contrast>[0]; fgSecondary: Parameters<typeof contrast>[0]; fgTertiary: Parameters<typeof contrast>[0]; fgStrong: Parameters<typeof contrast>[0] }) {
  return {
    fgOnPage: contrast(m.fg, m.page),
    fgSecondaryOnPage: contrast(m.fgSecondary, m.page),
    fgTertiaryOnPage: contrast(m.fgTertiary, m.page),
    fgStrongOnPage: contrast(m.fgStrong, m.page),
    fgOnSurface: contrast(m.fg, m.surface),
  }
}

const outCss = resolve(root, "src/styles/lab/candidates.css")
const outJson = resolve(root, "src/app/lab/color/candidates.json")
mkdirSync(dirname(outCss), { recursive: true })
mkdirSync(dirname(outJson), { recursive: true })
writeFileSync(outCss, css.join("\n") + "\n")
writeFileSync(outJson, JSON.stringify(report, null, 2) + "\n")
console.log(`wrote ${outCss}\nwrote ${outJson}\nbrand chroma proportion ${brandProportion.toFixed(3)}`)
