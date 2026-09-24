/**
 * Ramp construction in OKLCH. Pure functions; no I/O.
 *
 * A ramp is 12 steps with Radix's role mapping:
 *   1 page bg · 2 subtle bg · 3 component bg · 4 hover · 5 active · 6 subtle border
 *   7 border · 8 strong border / focus · 9 solid · 10 solid hover · 11 low-contrast text · 12 high-contrast text
 *
 * Rules (better-colors/palette-generation.md): steps evenly spaced in perceived lightness with the light end
 * denser, hue constant, chroma peaking mid-ramp and falling to near zero at both ends, both ends short of
 * pure black and white. Dark mode is its own spine, not a reversal.
 */
import { clampChroma, formatHex, oklch, wcagContrast, type Oklch } from "culori"

export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type Appearance = "light" | "dark"
export type Ramp = Record<Step, Oklch>

/** Perceptual lightness spines, derived from Radix's gray and blue scales measured in OKLCH. */
const SPINE = {
  neutral: {
    light: [0.992, 0.981, 0.955, 0.931, 0.909, 0.884, 0.845, 0.777, 0.646, 0.606, 0.499, 0.208],
    dark: [0.178, 0.211, 0.252, 0.283, 0.313, 0.348, 0.401, 0.489, 0.539, 0.583, 0.769, 0.949],
  },
  accent: {
    light: [0.993, 0.979, 0.952, 0.921, 0.883, 0.836, 0.775, 0.688, 0.59, 0.55, 0.48, 0.28],
    dark: [0.19, 0.225, 0.28, 0.32, 0.36, 0.41, 0.48, 0.56, 0.62, 0.66, 0.78, 0.93],
  },
} as const

/** Chroma envelope as a proportion of peak, indexed by step.
 *  Accents peak at the solid step and thin at both ends. Tinted neutrals hold the tint across the light
 *  steps, because the tint is the point and a near-white step 1 would lose it. */
const CHROMA_SHAPE = {
  accent: {
    light: [0.05, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 0.95, 1, 1, 0.9, 0.55],
    dark: [0.35, 0.45, 0.6, 0.72, 0.82, 0.9, 0.97, 1, 1, 0.95, 0.75, 0.3],
  },
  neutral: {
    light: [0.6, 0.75, 0.85, 0.95, 1, 1, 1, 0.95, 0.9, 0.85, 0.8, 0.5],
    dark: [0.7, 0.75, 0.85, 0.95, 1, 1, 1, 0.95, 0.9, 0.85, 0.8, 0.6],
  },
} as const

const STEPS: Step[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

/** Largest sRGB-representable chroma for a given lightness and hue. */
export function maxChroma(l: number, h: number): number {
  const c = clampChroma({ mode: "oklch", l, c: 0.4, h }, "oklch")
  return c.c ?? 0
}

export type RampSpec = {
  kind: "neutral" | "accent"
  appearance: Appearance
  hue: number
  /** For neutrals: absolute peak chroma (0 = pure gray, 0.01 = a trace, 0.02 = visibly tinted).
   *  For accents: proportion (0..1) of the hue's own maximum chroma at the solid step. */
  chroma: number
  /** Optional second hue for text steps 9..12 (dylanfdl.com's warm surfaces, cool text). */
  textHue?: number
  /** Accents only: pin the solid step's lightness so candidates compare at identical L. Steps 10..12 shift with it. */
  solidL?: number
}

export function buildRamp(spec: RampSpec): Ramp {
  const spine: number[] = [...SPINE[spec.kind][spec.appearance]]
  if (spec.solidL !== undefined) {
    const delta = spec.solidL - spine[8]
    for (let i = 8; i < 12; i++) spine[i] = Math.min(0.97, Math.max(0.08, spine[i] + delta))
  }
  const shape = CHROMA_SHAPE[spec.kind][spec.appearance]
  const peak = spec.kind === "accent" ? spec.chroma * maxChroma(spine[8], spec.hue) : spec.chroma
  const ramp = {} as Ramp
  for (const step of STEPS) {
    const i = step - 1
    const hue = spec.textHue !== undefined && step >= 9 ? spec.textHue : spec.hue
    const wanted: Oklch = { mode: "oklch", l: spine[i], c: peak * shape[i], h: hue }
    ramp[step] = clampChroma(wanted, "oklch")
  }
  return ramp
}

/** Pin the brand color exactly onto step 9 and rebuild the neighbours around it. */
export function pinSolid(ramp: Ramp, brand: Oklch): Ramp {
  return { ...ramp, 9: { ...brand, mode: "oklch" } }
}

export function toCss(c: Oklch): string {
  const l = (c.l * 100).toFixed(2)
  const ch = (c.c ?? 0).toFixed(4)
  const h = (c.h ?? 0).toFixed(2)
  return `oklch(${l}% ${ch} ${h})`
}

export function toHex(c: Oklch): string {
  return formatHex(c)
}

export function contrast(fg: Oklch, bg: Oklch): number {
  return Math.round(wcagContrast(fg, bg) * 100) / 100
}

export function parse(css: string): Oklch {
  const c = oklch(css)
  if (!c) throw new Error(`Cannot parse color: ${css}`)
  return c
}
