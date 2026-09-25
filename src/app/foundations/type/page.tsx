import type { Metadata } from "next"

import { Code } from "@/components/docs/code"
import { DocsShell, PageTitle, Section } from "@/components/docs/shell"
import tokens from "@/generated/tokens.json"

import { Article, DensePanel, TypeSpecimen } from "@/app/lab/type/specimens"

export const metadata: Metadata = { title: "Type" }

const px = (rem: string) => `${parseFloat(rem) * 16}px`

const roles: [string, string, string][] = [
  ["display", "Page titles. Lora, 32/40, weight 400.", "font-display text-display"],
  ["title", "Section titles. Lora, 16/24, weight 550.", "font-heading text-title"],
  ["heading", "Card and row titles. Lora, 16/24, weight 550.", "font-heading text-heading"],
  ["body", "Reading text. System sans, 16/24, weight 400.", "text-body"],
  ["ui", "Interface text: rows, labels, buttons. 13/20, weight 450.", "text-ui"],
  ["caption", "Metadata, timestamps. 12/16, weight 450. Mono for identifiers.", "text-caption"],
]

export default function TypePage() {
  const t = tokens.type as Record<string, string>
  return (
    <DocsShell>
      <div className="max-w-content">
        <PageTitle
          eyebrow="Foundations"
          title="Type"
          lede="Hierarchy comes from weight, family and color, not size. Body, headings and titles share 16px; Lora at weight 550 marks a heading, system sans at 400 is prose, 13px at 450 is interface. Every role carries its size, leading and weight together, so there is exactly one way to set text."
        />

        <Section title="Roles" lede="Six roles. Use the utility; never combine a size class with a leading class by hand.">
          <div className="rounded-lg bg-surface p-major hairline">
            <TypeSpecimen />
          </div>
          <div className="mt-major overflow-x-auto">
            <table className="w-full text-ui">
              <thead>
                <tr className="text-left font-mono text-caption uppercase tracking-wider text-fg-tertiary">
                  <th className="h-8 font-normal">role</th>
                  <th className="h-8 font-normal">size / leading</th>
                  <th className="h-8 font-normal">weight</th>
                  <th className="h-8 font-normal">use</th>
                  <th className="h-8 font-normal">utility</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(([r, use, cls]) => (
                  <tr key={r} className="hairline-t">
                    <td className="h-10 font-mono text-fg">{r}</td>
                    <td className="h-10 tabular-nums text-fg-secondary">{px(t[`type-${r}-size`])} / {px(t[`type-${r}-leading`])}</td>
                    <td className="h-10 tabular-nums text-fg-secondary">{t[`type-${r}-weight`]}</td>
                    <td className="h-10 text-fg-secondary">{use}</td>
                    <td className="h-10 font-mono text-fg-secondary">{cls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Families" lede="System sans for body and interface (zero font cost, matches the OS). Lora for display and every heading. Geist Mono for code, identifiers and metadata.">
          <Code>{`font-sans      ui-sans-serif, system-ui, sans-serif\nfont-display   Lora (display role)\nfont-heading   Lora (title and heading roles); system sans under data-quiet\nfont-mono      Geist Mono`}</Code>
          <p className="mt-major max-w-reading text-ui text-fg-secondary">
            Weight 550 needs a variable font. SF Pro and Segoe UI Variable have it; static Segoe UI snaps to 600, which is acceptable.
            Figma renders Inter where the browser renders the system font; that gap is accepted and documented on the library cover.
          </p>
        </Section>

        <Section title="Reading" lede="An article at the reading measure (33rem). Headings are the same size as body; the family and weight change is the hierarchy.">
          <div className="rounded-lg bg-page p-major hairline">
            <Article />
          </div>
        </Section>

        <Section title="Dense" lede="The same roles on a data panel. 13px interface text at weight 450 holds up at density; tabular numerals on every figure.">
          <DensePanel />
        </Section>

        <Section title="Rules" lede="Short, and the linter and probe check most of them.">
          <ul className="max-w-reading list-disc space-y-minor pl-5 text-ui text-fg">
            <li>Set text only with a role utility. `text-sm leading-6` by hand is a defect.</li>
            <li>Line-heights are pixel multiples of 4 (24, 20, 16, 40). Never unitless.</li>
            <li>`tabular-nums` on anything that lines up in a column: dates, tallies, prices.</li>
            <li>`text-balance` on titles, `text-pretty` on paragraphs.</li>
            <li>Do not invent a size between roles. If 16 is too small for a heading in a given place, the answer is display, not 20.</li>
            <li>Under `data-quiet`, headings fall back to system sans; sizes and weights do not change.</li>
          </ul>
        </Section>
      </div>
    </DocsShell>
  )
}
