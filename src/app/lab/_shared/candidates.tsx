"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export type CandidateId = "a" | "b" | "c"
export type AxisDef<A extends string> = { axis: A; param: string; label: string }
export type Selection<A extends string> = Record<A, CandidateId>

export const IDS: CandidateId[] = ["a", "b", "c"]

function pick(params: URLSearchParams, p: string): CandidateId {
  const v = params.get(p)
  return v === "b" || v === "c" ? v : "a"
}

/** URL-carried selection: one letter per axis, A omitted. */
export function useSelection<A extends string>(axes: AxisDef<A>[]) {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const selection = Object.fromEntries(axes.map((a) => [a.axis, pick(params, a.param)])) as Selection<A>
  const set = useCallback(
    (axis: A, id: CandidateId) => {
      const next = new URLSearchParams(params.toString())
      const param = axes.find((a) => a.axis === axis)!.param
      if (id === "a") next.delete(param)
      else next.set(param, id)
      const qs = next.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [axes, params, router, pathname],
  )
  return { selection, set }
}

/** Applies a selection as data-* attributes so scoped candidate CSS takes effect inside. */
export function CandidateScope<A extends string>({ selection, className, children, dark }: { selection: Selection<A>; className?: string; children: ReactNode; dark?: boolean }) {
  const attrs = Object.fromEntries(Object.entries(selection).map(([axis, id]) => [`data-${axis}`, id]))
  return (
    <div {...attrs} className={cn(dark && "dark", className)}>
      {children}
    </div>
  )
}

export function Segmented({ label, value, options, onChange }: { label: string; value: CandidateId; options: { id: CandidateId; name: string }[]; onChange: (id: CandidateId) => void }) {
  return (
    <div className="flex items-center gap-minor">
      <span className="w-16 font-mono text-caption uppercase tracking-wider text-fg-tertiary">{label}</span>
      <div role="radiogroup" aria-label={label} className="flex rounded-md border border-line bg-sunken p-0.5">
        {options.map((o) => {
          const active = o.id === value
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.id)}
              className={cn(
                "h-7 rounded-sm px-2.5 text-ui transition-interactive duration-fast ease-out press",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                active ? "bg-surface text-fg-strong elevation-raised" : "text-fg-secondary hover:text-fg",
              )}
            >
              <span className="font-mono text-caption text-fg-tertiary">{o.id.toUpperCase()}</span> {o.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Toolbar({ children }: { children: ReactNode }) {
  return <div className="sticky top-0 z-10 -mx-major flex flex-wrap items-center gap-major border-b border-separator bg-page/90 px-major py-minor backdrop-blur">{children}</div>
}

export function Section({ title, lede, children }: { title: string; lede: string; children: ReactNode }) {
  return (
    <section className="border-t border-separator py-12">
      <div className="mb-major flex items-baseline gap-major">
        <h2 className="w-48 shrink-0 font-display text-title text-fg-strong">{title}</h2>
        <p className="max-w-reading text-ui text-fg-secondary">{lede}</p>
      </div>
      {children}
    </section>
  )
}

/** Three candidates of one axis side by side, holding the other axes at the current selection. */
export function Compare<A extends string>({ axis, selection, meta, children, both, stacked }: { axis: A; selection: Selection<A>; meta: Record<CandidateId, { name: string; note: string }>; children: (s: Selection<A>) => ReactNode; both?: boolean; stacked?: boolean }) {
  return (
    <div className={cn("gap-major", stacked ? "flex flex-col" : "grid grid-cols-3")}>
      {IDS.map((id) => {
        const s = { ...selection, [axis]: id } as Selection<A>
        const m = meta[id]
        return (
          <div key={id} className="min-w-0">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-mono text-caption text-fg-tertiary">{id.toUpperCase()}</span>
              <span className="text-ui font-medium text-fg-strong">{m.name}</span>
              {id === "a" ? <span className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">baseline</span> : null}
            </div>
            <CandidateScope selection={s} className="rounded-lg border border-line bg-page p-major text-fg">
              {children(s)}
            </CandidateScope>
            {both ? (
              <CandidateScope selection={s} dark className="mt-2 rounded-lg border border-line bg-page p-major text-fg">
                {children(s)}
              </CandidateScope>
            ) : null}
            <p className="mt-2 text-caption leading-5 text-fg-secondary">{m.note}</p>
          </div>
        )
      })}
    </div>
  )
}
