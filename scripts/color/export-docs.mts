/**
 * Emits src/generated/tokens.json for the docs site: ramps as hex + oklch, semantic roles per appearance,
 * accents, status, and the hand-authored type/rounded/motion tokens read from tokens.css.
 *
 *   node scripts/color/export-docs.mts
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { contrast, toCss, toHex, type Appearance, type Ramp } from "./ramps.mts"
import { accent, config, neutral, status } from "./system.mts"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "../..")

const rampOut = (r: Ramp) => Object.entries(r).map(([step, c]) => ({ step: Number(step), hex: toHex(c), oklch: toCss(c) }))

function appearance(a: Appearance) {
  const n = neutral(a)
  return {
    neutral: rampOut(n.ramp),
    text: {
      fg: { hex: toHex(n.fg), oklch: toCss(n.fg), onPage: contrast(n.fg, n.ramp[1]) },
      "fg-secondary": { hex: toHex(n.fgSecondary), oklch: toCss(n.fgSecondary), onPage: contrast(n.fgSecondary, n.ramp[1]) },
      "fg-tertiary": { hex: toHex(n.fgTertiary), oklch: toCss(n.fgTertiary), onPage: contrast(n.fgTertiary, n.ramp[1]) },
      "fg-strong": { hex: toHex(n.fgStrong), oklch: toCss(n.fgStrong), onPage: contrast(n.fgStrong, n.ramp[1]) },
    },
    accents: Object.fromEntries(config.accents.map((d) => [d.name, { hue: d.hue, ramp: rampOut(accent(d, a)), onSolid: contrast(n.ramp[1], accent(d, a)[9]) }])),
    status: Object.fromEntries((["danger", "success", "warning"] as const).map((k) => [k, { hue: config.status[k].hue, ramp: rampOut(status(k, a)) }])),
  }
}

/* Hand-authored tokens read straight from tokens.css so the docs cannot drift from the file. */
const css = readFileSync(resolve(root, "src/styles/tokens.css"), "utf8")
/* Light values live in the `:root` blocks, dark in `.dark`; reading the whole file lets dark overwrite light. */
const darkAt = css.search(/^\.dark[ ,]/m)
const lightCss = css.slice(0, darkAt)
const darkCss = css.slice(darkAt, css.indexOf("}", darkAt))
const readIn = (src: string, prefix: string) => Object.fromEntries([...src.matchAll(new RegExp(`--(${prefix}[a-z0-9-]*):\\s*([^;]+);`, "g"))].map((m) => [m[1], m[2].trim()]))
const read = (prefix: string) => readIn(css, prefix)

const out = {
  generatedAt: new Date().toISOString().slice(0, 10),
  neutral: config.neutral,
  light: appearance("light"),
  dark: appearance("dark"),
  rounded: read("rounded-"),
  type: read("type-"),
  motion: read("motion-"),
  space: read("space-"),
  measure: read("measure-"),
  elevation: { light: readIn(lightCss, "elevation-"), dark: readIn(darkCss, "elevation-") },
}
mkdirSync(resolve(root, "src/generated"), { recursive: true })
writeFileSync(resolve(root, "src/generated/tokens.json"), JSON.stringify(out, null, 2) + "\n")
console.log("wrote src/generated/tokens.json")
