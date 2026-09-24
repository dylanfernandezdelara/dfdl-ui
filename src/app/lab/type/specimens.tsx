import { ChevronRight, Filter, Search } from "lucide-react"

import { cn } from "@/lib/utils"

/* Throwaway specimens for Lab 2. Every size, leading and weight comes from a text-* role utility. */

export function Article() {
  return (
    <article className="max-w-reading">
      <p className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">Notes · Sep 2026</p>
      <h1 className="mt-2 font-display text-display text-balance text-fg-strong">The invisible side of building environments</h1>
      <p className="mt-2 text-ui text-fg-secondary">Dylan Fernandez de Lara · 6 min read</p>
      <p className="mt-major text-body text-pretty text-fg">
        Most of what makes a reinforcement-learning environment good never shows up in a demo. It is the verification the
        agent cannot see, the partial credit that gives a policy something to climb, and the rubric that captures the
        judgment tests miss. <em className="font-display italic">Taste is trained</em>, and environments are where it is
        trained.
      </p>
      <h2 className="mt-major font-heading text-title text-fg-strong">Verification the agent cannot see</h2>
      <p className="mt-minor text-body text-pretty text-fg">
        If the tests are in the repo, the agent optimizes the tests. Hold out a verification set, and prefer graders that
        check behavior over graders that check text. A request that returns the right shape under load is evidence; a
        sentence claiming edge cases were considered is not.
      </p>
      <h3 className="mt-major font-heading text-heading text-fg-strong">What to hold out</h3>
      <ul className="mt-minor list-disc space-y-1 pl-5 text-body text-fg">
        <li>Integration tests that exercise the seam between components.</li>
        <li>
          Property tests seeded from production traffic, like <code className="rounded-xs bg-sunken px-1 font-mono text-ui">shape(request) == shape(response)</code>.
        </li>
        <li>Anything the task description would otherwise leak.</li>
      </ul>
      <blockquote className="mt-major border-l-2 border-line pl-major font-display text-title italic text-fg-secondary">
        Grade the artifact, not the narration.
      </blockquote>
      <p className="mt-major text-body text-pretty text-fg">
        The practical order: start with hidden tests, add subgoal credit, then layer in rubric grading for the behaviours
        tests miss.<sup className="font-mono text-caption text-accent-text">1</sup>
      </p>
      <p className="mt-major border-t border-separator pt-minor text-caption text-fg-tertiary">
        1. Rotate rubric wording between episodes and keep a human-labelled holdout to measure grader drift.
      </p>
    </article>
  )
}

const rows = [
  { date: "Sep 24", title: "Local Communities & Bird Habitat Stewardship Act of 2026", meta: "Environmental Protection · House", status: "Passed", tally: "345–60", ok: true },
  { date: "Sep 23", title: "National Wildlife Refuge System Invasive Species Strike Team Act", meta: "Environmental Protection · House", status: "Passed", tally: "371–33", ok: true },
  { date: "Sep 22", title: "Badge-to-Business Act", meta: "Commerce · Introduced in the House", status: "Introduced", tally: "", ok: false },
  { date: "Sep 19", title: "Continuing Appropriations and Extensions Act", meta: "Appropriations · Senate", status: "Failed", tally: "48–52", ok: false },
]

export function DensePanel() {
  return (
    <div className="rounded-lg border border-line bg-surface elevation-raised">
      <header className="flex h-control items-center justify-between border-b border-separator px-major">
        <h2 className="font-heading text-heading text-fg-strong">Chronological timeline</h2>
        <span className="font-mono text-caption tabular-nums text-fg-tertiary">128 bills</span>
      </header>
      <div className="flex items-center gap-2 border-b border-separator px-major py-2">
        <div role="radiogroup" className="flex rounded-sm border border-line bg-sunken p-0.5">
          {["All", "House", "Senate"].map((o, i) => (
            <span key={o} className={cn("flex h-6 items-center rounded-xs px-2 text-ui", i === 0 ? "bg-surface text-fg-strong elevation-raised" : "text-fg-secondary")}>
              {o}
            </span>
          ))}
        </div>
        <span className="flex h-7 items-center gap-1.5 rounded-sm border border-line px-2 text-ui text-fg-secondary">
          <Filter className="size-3.5" strokeWidth={1.5} aria-hidden /> Filters
        </span>
        <span className="ml-auto flex h-7 w-48 items-center gap-2 rounded-sm border border-line bg-page px-2 text-ui text-fg-tertiary">
          <Search className="size-3.5" strokeWidth={1.5} aria-hidden /> Search bills
        </span>
      </div>
      <ul className="divide-y divide-separator">
        {rows.map((r) => (
          <li key={r.title} className="flex items-start gap-major px-major py-2.5">
            <span className="w-12 shrink-0 pt-0.5 font-mono text-caption tabular-nums text-fg-tertiary">{r.date}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-ui font-medium text-fg-strong">{r.title}</p>
              <p className="text-caption text-fg-secondary">
                <span className={cn(r.status === "Passed" && "text-success-text", r.status === "Failed" && "text-danger-text")}>{r.status}</span>
                {r.tally ? <span className="tabular-nums"> · {r.tally}</span> : null} · {r.meta}
              </p>
            </div>
            <ChevronRight className="mt-1 size-4 shrink-0 text-fg-tertiary" strokeWidth={1.5} aria-hidden />
          </li>
        ))}
      </ul>
      <dl className="grid grid-cols-3 divide-x divide-separator border-t border-separator">
        {[
          ["House", "R 218 · D 214"],
          ["Senate", "R 53 · D 47"],
          ["Closest vote", "210–208"],
        ].map(([k, v]) => (
          <div key={k} className="px-major py-2">
            <dt className="text-caption text-fg-tertiary">{k}</dt>
            <dd className="text-ui tabular-nums text-fg">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Concentric nesting: card (lg) wraps a field (md) that wraps a chip (xs). Outer = inner + padding. */
export function ConcentricCard() {
  return (
    <div className="rounded-lg border border-line bg-surface p-major elevation-raised">
      <p className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">Invite</p>
      <h3 className="mt-1 font-heading text-heading text-fg-strong">Share this chat</h3>
      <div className="mt-minor flex h-control items-center gap-1 rounded-md border border-line bg-page p-1 pl-2">
        <span className="flex h-6 items-center gap-1 rounded-xs bg-accent-bg px-1.5 text-caption text-accent-text">dylan@fork.app</span>
        <span className="flex-1 text-ui text-fg-tertiary">Add people…</span>
        <span className="flex h-6 items-center rounded-xs bg-accent-solid px-2 text-caption font-medium text-fg-on-accent">Send</span>
      </div>
      <div className="mt-minor flex gap-2">
        <span className="flex h-control items-center rounded-sm bg-accent-solid px-3 text-ui font-medium text-fg-on-accent">Copy link</span>
        <span className="flex h-control items-center rounded-sm border border-line bg-surface px-3 text-ui text-fg">Cancel</span>
        <span className="ml-auto flex h-control items-center rounded-full border border-line px-3 text-ui text-fg-secondary">Anyone with link</span>
      </div>
    </div>
  )
}

export function TypeSpecimen() {
  const rows: [string, string, string][] = [
    ["display", "font-display text-display", "Display"],
    ["title", "font-heading text-title", "Title, section heading"],
    ["heading", "font-heading text-heading", "Heading, card title"],
    ["body", "text-body", "Body copy for reading"],
    ["ui", "text-ui", "Interface text, rows, labels"],
    ["caption", "text-caption", "Caption, metadata"],
  ]
  return (
    <div className="divide-y divide-separator">
      {rows.map(([k, cls, sample]) => (
        <div key={k} className="flex items-baseline gap-major py-2">
          <span className="w-16 shrink-0 font-mono text-caption text-fg-tertiary">{k}</span>
          <span className={cn(cls, "text-fg-strong")}>{sample}</span>
        </div>
      ))}
    </div>
  )
}
