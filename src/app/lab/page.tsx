import Link from "next/link"

import { DocsShell, PageTitle } from "@/components/docs/shell"

/**
 * Lab index. Each lab is a route under /lab. Labs show bounded candidates side by side;
 * Dylan picks, the choice lands in decisions.md and tokens.css.
 */
const labs = [
  { slug: "color", title: "Color and surfaces", status: "done", summary: "Neutral ramp, three accents in context, depth recipes." },
  { slug: "type", title: "Type, rhythm and shape", status: "done", summary: "Scale, serif scope, radius with concentric nesting." },
  { slug: "motion", title: "Motion", status: "done", summary: "Curves, durations by frequency, exits, press, springs." },
]

export default function LabIndexPage() {
  return (
    <>
      <DocsShell>
      <div className="max-w-content">
        <PageTitle eyebrow="Resources" title="Labs" lede="Where each foundation was decided, with the alternatives it beat." />
        <ul>
          {labs.map((lab) => (
            <li key={lab.slug} className="flex items-start gap-major py-major hairline-t">
              <span className="flex h-6 w-24 shrink-0 items-center text-ui text-fg-tertiary">{lab.status}</span>
              <div className="flex-1">
                <h2 className="text-heading font-semibold text-fg-strong">{lab.title}</h2>
                <p className="text-ui text-fg-secondary">{lab.summary}</p>
              </div>
              <Link href={`/lab/${lab.slug}`} className="flex h-6 items-center text-ui text-accent-text underline decoration-accent-border underline-offset-2">/lab/{lab.slug}</Link>
            </li>
          ))}
        </ul>
      </div>
    </DocsShell>
    </>
  )
}
