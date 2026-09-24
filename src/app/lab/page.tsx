import Link from "next/link"

import { SiteHeader } from "@/components/site-header"

/**
 * Lab index. Each lab is a route under /lab. Labs show bounded candidates side by side;
 * Dylan picks, the choice lands in decisions.md and tokens.css.
 */
const labs = [
  { slug: "color", title: "Color and surfaces", status: "done", summary: "Neutral ramp, three accents in context, depth recipes." },
  { slug: "type", title: "Type, rhythm and shape", status: "open", summary: "Scale, serif scope, radius with concentric nesting." },
  { slug: "motion", title: "Motion", status: "pending", summary: "Curves, durations by frequency, exits, press, springs." },
]

export default function LabIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-content px-major py-12">
        <h1 className="font-serif text-2xl leading-8 text-fg-strong">Lab</h1>
        <p className="mt-minor max-w-reading text-base leading-6 text-fg-secondary">
          Where the foundations get decided. Every lab shows the current values as a baseline beside two alternatives.
          Press <kbd className="rounded-sm border border-line bg-sunken px-1 font-mono text-xs">g</kbd> for the grid.
        </p>
        <ul className="mt-12 divide-y divide-separator border-y border-separator">
          {labs.map((lab) => (
            <li key={lab.slug} className="flex items-baseline gap-major py-major">
              <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-wider text-fg-tertiary">{lab.status}</span>
              <div className="flex-1">
                <h2 className="text-base font-medium leading-6 text-fg-strong">{lab.title}</h2>
                <p className="mt-1 text-sm leading-6 text-fg-secondary">{lab.summary}</p>
              </div>
              <Link href={`/lab/${lab.slug}`} className="text-sm text-accent-text underline decoration-accent-border underline-offset-2">/lab/{lab.slug}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
