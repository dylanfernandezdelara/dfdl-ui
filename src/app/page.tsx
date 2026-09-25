import Link from "next/link"

import { Command } from "@/components/docs/code"
import { NAV } from "@/components/docs/nav"
import { DocsShell, Section } from "@/components/docs/shell"
import tokens from "@/generated/tokens.json"

const principles: [string, string][] = [
  ["One warm family", "Surfaces and text share one hue. Cream in light, charcoal in dark. Nothing pure white or pure black."],
  ["Hierarchy from weight", "Body, headings and titles share 16px. Weight 550, Lora and color separate them, not size."],
  ["One accent, chosen once", "Ember by default, indigo where a product already owns blue. It marks the primary action and selection and nothing else."],
  ["Motion you do not notice", "Strong ease-out, 100 to 500ms by how often it happens, exits at 75%. If you can describe the animation, it is too much."],
  ["Everything on the grid", "8px minor, 24px major, measured by a probe. One 2px slip in a header shifts every row under it."],
  ["Quiet mode for tools", "Data-dense products drop the serif and the accent with one attribute. Same neutrals, type, radius and motion."],
]

export default function OverviewPage() {
  const ember = tokens.light.accents.ember.ramp
  const neutral = tokens.light.neutral
  return (
    <DocsShell>
      <div className="max-w-content">
        <div className="py-12">
          <p className="flex h-6 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">dfdl ui · {tokens.generatedAt}</p>
          <h1 className="mt-minor max-w-reading font-display text-display text-balance text-fg-strong">The way Dylan builds interfaces, as a package.</h1>
          <p className="mt-major max-w-reading text-body text-pretty text-fg">
            Tokens, components, a skill for coding agents, a lint policy and a Figma library, all generated from one set of
            decisions. Install it and what comes back looks and moves like Dylan made it, whether a person or an agent wrote
            the code.
          </p>
          <div className="mt-major grid gap-minor sm:grid-cols-2">
            <Command>npx shadcn add https://ui.dylanfdl.com/r/tokens.json</Command>
            <Command>npx skills add dylanfernandezdelara/dfdl-ui</Command>
          </div>
        </div>

        {/* Live swatch strip: rendered from the generated tokens, not pasted. */}
        <div className="grid grid-cols-12 gap-1" aria-label="Neutral and accent ramps">
          {neutral.map((s) => (
            <div key={`n${s.step}`} className="h-8 rounded-xs swatch hairline" style={{ "--swatch": s.oklch } as React.CSSProperties} />
          ))}
          {ember.map((s) => (
            <div key={`e${s.step}`} className="h-8 rounded-xs swatch hairline" style={{ "--swatch": s.oklch } as React.CSSProperties} />
          ))}
        </div>

        <Section title="What it is for" lede="Six things the system insists on. Every one was chosen in a lab, against alternatives, and is written down with the reason.">
          <dl className="grid gap-major sm:grid-cols-2">
            {principles.map(([t, d]) => (
              <div key={t}>
                <dt className="font-heading text-heading text-fg-strong">{t}</dt>
                <dd className="mt-minor text-ui text-fg-secondary">{d}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="What is inside" lede="Each part is the same standard in the form its reader needs. Refine one and the others follow.">
          <ul className="grid gap-minor sm:grid-cols-2">
            {[
              ["Tokens", "tokens.css for Tailwind v4, tokens.hsl.css for v3. OKLCH, two tiers, light and dark, generated.", "/foundations/color"],
              ["Foundations", "Color, type, shape and rhythm, motion. Live pages rendered from the tokens.", "/foundations/type"],
              ["Components", "shadcn registry on Base UI. Each ships with a restyle contract, every state, and a probe-verified motion spec.", "/components/button"],
              ["Skill", "skills/dfdl-ui: what agents read. Values, anti-patterns, verification steps, the adoption recipe.", "/guide"],
              ["Lint policy", "@shadcn/lint: no raw colors, no arbitrary values, no restyling components. Mechanical rules, enforced.", "/guide"],
              ["Figma library", "Variables with modes, one component per page, generated from code. Code is the source of truth.", "/guide"],
            ].map(([t, d, href]) => (
              <li key={t}>
                <Link href={href} className="flex h-full flex-col rounded-lg bg-surface p-major transition-interactive duration-fast ease-out hairline hover:bg-surface-hover">
                  <span className="font-heading text-heading text-fg-strong">{t}</span>
                  <span className="mt-minor text-ui text-fg-secondary">{d}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Sections" lede="Everything on this site.">
          <div className="grid gap-major sm:grid-cols-2 lg:grid-cols-4">
            {NAV.map((g) => (
              <div key={g.label}>
                <p className="flex h-6 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">{g.label}</p>
                <ul className="mt-minor">
                  {g.items.map((i) => (
                    <li key={i.href} className="flex h-6 items-center text-ui">
                      {i.status === "soon" ? (
                        <span className="text-fg-tertiary">{i.label} · soon</span>
                      ) : (
                        <Link href={i.href} className="text-fg-secondary hover:text-fg">{i.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </DocsShell>
  )
}
