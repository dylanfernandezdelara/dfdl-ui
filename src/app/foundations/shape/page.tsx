import type { Metadata } from "next"

import { Code } from "@/components/docs/code"
import { DocsShell, PageTitle, Section } from "@/components/docs/shell"
import tokens from "@/generated/tokens.json"

import { ConcentricCard } from "@/app/lab/type/specimens"

export const metadata: Metadata = { title: "Shape and rhythm" }

const radii: [string, string, string][] = [
  ["xs", "rounded-xs", "Chips, inline code, thumbs inside a control"],
  ["sm", "rounded-sm", "Buttons, inputs, segmented controls, menu items"],
  ["md", "rounded-md", "Fields that contain controls, popovers, toasts"],
  ["lg", "rounded-lg", "Cards, panels, dialogs"],
  ["xl", "rounded-xl", "Sheets, drawers, page-level frames"],
  ["full", "rounded-full", "Pills, avatars, switch tracks"],
]

const heights: [string, string][] = [
  ["24", "chips, inline segment thumbs, icon-only affordances inside a 32 row"],
  ["28", "dense controls: filter chips, table actions"],
  ["32", "default controls: buttons, inputs, segmented control, list rows"],
  ["40", "prominent inputs (search, composer), primary CTA on marketing surfaces"],
  ["48", "headers, toolbars, large touch targets"],
]

export default function ShapePage() {
  const r = tokens.rounded as Record<string, string>
  return (
    <DocsShell>
      <div className="max-w-content">
        <PageTitle
          eyebrow="Foundations"
          title="Shape and rhythm"
          lede="One round radius family and an 8px grid."
        />

        <Section title="Radius" lede="Six values. Nested corners stay concentric: inner radius = outer radius − padding.">
          <div className="grid grid-cols-3 gap-major sm:grid-cols-6">
            {radii.map(([k, cls]) => (
              <div key={k} className="min-w-0">
                <div className={`h-16 bg-surface-active hairline ${cls}`} />
                <p className="mt-minor font-mono text-caption text-fg">{cls}</p>
                <p className="font-mono text-caption tabular-nums text-fg-tertiary">{r[`rounded-${k}`]}</p>
              </div>
            ))}
          </div>
          <ul className="mt-major max-w-reading text-ui text-fg-secondary">
            {radii.map(([k, cls, use]) => (
              <li key={k} className="flex h-8 items-center gap-major">
                <span className="w-32 shrink-0 font-mono text-fg">{cls}</span>
                <span>{use}</span>
              </li>
            ))}
          </ul>
          <div className="mt-major grid gap-major sm:grid-cols-2">
            <ConcentricCard />
            <div className="text-ui text-fg-secondary">
              <p className="text-fg">Concentric, shown.</p>
              <p className="mt-minor">
                The card is <span className="font-mono">rounded-lg</span> (16) with 24px padding. The field inside is{" "}
                <span className="font-mono">rounded-md</span> (12) with 4px padding. The chip inside that is <span className="font-mono">rounded-xs</span> (8).
                Each step down is the padding between them, so the curves run parallel instead of pinching.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Rhythm" lede="8px minor, 24px major.">
          <Code>{`gap-minor  p-minor  mt-minor   8px\ngap-major  p-major  mt-major  24px\npy-12                         48px (two majors)\nmax-w-reading                 33rem, the article measure\nmax-w-content                 64rem`}</Code>
          <p className="mt-major flex h-6 items-center text-ui text-fg-tertiary">control heights</p>
          <ul className="mt-minor max-w-reading text-ui text-fg-secondary">
            {heights.map(([h, use]) => (
              <li key={h} className="flex h-8 items-center gap-major">
                <span className="w-32 shrink-0 font-mono tabular-nums text-fg">{h}px</span>
                <span>{use}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Staying on the grid" lede="Press g for the grid and Shift+G to outline anything off it.">
          <ul className="max-w-reading list-disc space-y-minor pl-5 text-ui text-fg">
            <li>Control heights from the list above; never `h-7`, `h-9`, `h-11`.</li>
            <li>`items-center` in rows, not `items-baseline`. Baseline alignment of two line-heights lands on half pixels.</li>
            <li>A 1px border adds a pixel. Use `hairline`, `hairline-t`, `hairline-b` (shadows) for lines that would otherwise push content off the grid.</li>
            <li>Line-heights in px, multiples of 4. A unitless `line-height: 1.4` on 12px text is 16.8px and everything below it drifts.</li>
            <li>Margins in `minor` and `major`; `mt-1` and `mt-2` inside a component only.</li>
          </ul>
          <Code>{`# agents: measure, do not eyeball\nagent-browser eval "$(cat scripts/probes/grid.js)"\n# → { checked: 412, total: 0, summary: "0 of 412 blocks off the 4px grid" }`}</Code>
        </Section>
      </div>
    </DocsShell>
  )
}
