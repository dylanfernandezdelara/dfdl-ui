import Link from "next/link"

import { DocsShell } from "@/components/docs/shell"

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
        <p className="flex h-6 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">Process</p>
        <h1 className="mt-minor font-display text-display text-fg-strong">Labs</h1>
        <p className="mt-minor max-w-reading text-body text-fg-secondary">
          Where the foundations get decided. Every lab shows the current values as a baseline beside two alternatives.
          Press <kbd className="rounded-xs bg-sunken px-1 font-mono text-caption hairline">g</kbd> for the grid.
        </p>
        <ul className="mt-12">
          {labs.map((lab) => (
            <li key={lab.slug} className="flex items-start gap-major py-major hairline-t">
              <span className="flex h-6 w-24 shrink-0 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">{lab.status}</span>
              <div className="flex-1">
                <h2 className="font-heading text-heading text-fg-strong">{lab.title}</h2>
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
