import { GUIDE } from "@/content/guide"
import { NAV } from "@/components/docs/nav"
import { COMPONENTS } from "@/content/components"
import tokens from "@/generated/tokens.json"
import { addCommand, GITHUB_URL, SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

/** llms.txt: the guide, the token values, and the site map, as plain text for agents. */
export function GET() {
  const t = tokens.type as Record<string, string>
  const m = tokens.motion as Record<string, string>
  const r = tokens.rounded as Record<string, string>
  const lines: string[] = [
    "# dfdl ui",
    "",
    `> Tokens and React components for Dylan Fernandez de Lara's products, on Base UI and Tailwind v4. Source: ${GITHUB_URL}`,
    "",
    `Install the theme: ${addCommand("theme")}`,
    `Add a component: ${addCommand("button")}`,
    "",
  ]
  for (const s of GUIDE) {
    lines.push(`## ${s.title}`, "", ...s.body.flatMap((p) => [p, ""]))
    if (s.code) lines.push("```", s.code, "```", "")
  }
  lines.push("## Token values", "")
  lines.push(`Neutral: hue ${tokens.neutral.hue}, chroma ${tokens.neutral.chroma}.`)
  for (const a of ["light", "dark"] as const) {
    const n = tokens[a]
    lines.push(`Neutral ${a}: ${n.neutral.map((s) => `${s.step}=${s.hex}`).join(" ")}`)
    lines.push(`Text ${a}: ${Object.entries(n.text).map(([k, v]) => `${k}=${v.hex} (${v.onPage}:1)`).join(" ")}`)
    for (const [name, acc] of Object.entries(n.accents)) lines.push(`Accent ${name} ${a}: ${acc.ramp.map((s) => `${s.step}=${s.hex}`).join(" ")}`)
    for (const [name, st] of Object.entries(n.status)) lines.push(`Status ${name} ${a}: ${st.ramp.map((s) => `${s.step}=${s.hex}`).join(" ")}`)
  }
  lines.push("", `Rounded: ${Object.entries(r).map(([k, v]) => `${k.replace("rounded-", "")}=${v}`).join(" ")}`)
  lines.push(`Type: ${["display", "title", "heading", "body", "ui", "caption"].map((k) => `${k}=${t[`type-${k}-size`]}/${t[`type-${k}-leading`]}/${t[`type-${k}-weight`]}`).join(" ")}`)
  lines.push(`Motion: ease-out=${m["motion-ease-out"]} ease-in-out=${m["motion-ease-in-out"]} ease-drawer=${m["motion-ease-drawer"]} instant=${m["motion-instant"]} fast=${m["motion-fast"]} normal=${m["motion-normal"]} slow=${m["motion-slow"]} slower=${m["motion-slower"]} exit=${m["motion-exit-factor"]} press=${m["motion-press"]}`)
  lines.push("", "## Components", "")
  for (const c of COMPONENTS) lines.push(`- ${c.name}: ${c.description} ${addCommand(c.slug)}`)
  lines.push("", "## Pages", "")
  for (const g of NAV) for (const i of g.items) lines.push(`- ${g.label} / ${i.label}: ${i.href.startsWith("http") ? i.href : `${SITE_URL}${i.href}`}`)
  return new Response(lines.join("\n") + "\n", { headers: { "content-type": "text/plain; charset=utf-8" } })
}
