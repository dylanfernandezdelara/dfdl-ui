/**
 * The approved color system as data and pure functions. build-tokens.mts and export-legacy.mts read from here.
 */
import { buildRamp, type Appearance, type Ramp } from "./ramps.mts"

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

export function neutral(appearance: Appearance) {
  const ramp = buildRamp({ kind: "neutral", appearance, hue: config.neutral.hue, chroma: config.neutral.chroma })
  const t = config.text[appearance]
  const textC = config.neutral.chroma * (appearance === "light" ? 1.4 : 1.1)
  const text = (l: number) => ({ mode: "oklch" as const, l, c: textC, h: config.neutral.hue })
  return { ramp, fg: text(t.fg), fgSecondary: text(t.fgSecondary), fgTertiary: text(t.fgTertiary), fgStrong: text(t.fgStrong) }
}

export type AccentDef = (typeof config.accents)[number]
export function accent(def: AccentDef, appearance: Appearance): Ramp {
  return buildRamp({ kind: "accent", appearance, hue: def.hue, chroma: def.proportion[appearance], solidL: config.accent.solidL[appearance] })
}

export function status(name: keyof typeof config.status, appearance: Appearance): Ramp {
  const s = config.status[name]
  const proportion = appearance === "light" ? s.proportion : s.proportion * config.accent.darkFactor
  return buildRamp({ kind: "accent", appearance, hue: s.hue, chroma: proportion, solidL: config.accent.solidL[appearance] })
}

