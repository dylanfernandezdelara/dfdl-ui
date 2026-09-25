"use client"

import { Pin, X } from "lucide-react"
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

/** A selection as a short code, one letter per axis in axis order: "bac". */
export function encode<A extends string>(axes: AxisDef<A>[], s: Selection<A>): string {
  return axes.map((a) => s[a.axis]).join("")
}
export function decode<A extends string>(axes: AxisDef<A>[], code: string): Selection<A> | null {
  if (code.length !== axes.length || !/^[abc]+$/.test(code)) return null
  return Object.fromEntries(axes.map((a, i) => [a.axis, code[i] as CandidateId])) as Selection<A>
}

/** URL-carried selection (one letter per axis, A omitted) plus a pinned shortlist (`pin=bac,abc`). */
export function useSelection<A extends string>(axes: AxisDef<A>[]) {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const selection = Object.fromEntries(axes.map((a) => [a.axis, pick(params, a.param)])) as Selection<A>
  const pins = (params.get("pin") ?? "").split(",").map((c) => decode(axes, c)).filter((s): s is Selection<A> => s !== null)

  const replace = useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [router, pathname],
  )
  const set = useCallback(
    (axis: A, id: CandidateId) => {
      const next = new URLSearchParams(params.toString())
      const param = axes.find((a) => a.axis === axis)!.param
      if (id === "a") next.delete(param)
      else next.set(param, id)
      replace(next)
    },
    [axes, params, replace],
  )
  const load = useCallback(
    (s: Selection<A>) => {
      const next = new URLSearchParams(params.toString())
      for (const a of axes) {
        if (s[a.axis] === "a") next.delete(a.param)
        else next.set(a.param, s[a.axis])
      }
      replace(next)
    },
    [axes, params, replace],
  )
  const setPins = useCallback(
    (list: Selection<A>[]) => {
      const next = new URLSearchParams(params.toString())
      const codes = [...new Set(list.map((s) => encode(axes, s)))]
      if (codes.length) next.set("pin", codes.join(","))
      else next.delete("pin")
      replace(next)
    },
    [axes, params, replace],
  )
  const pin = useCallback(() => setPins([...pins, selection]), [pins, selection, setPins])
  const unpin = useCallback((code: string) => setPins(pins.filter((s) => encode(axes, s) !== code)), [axes, pins, setPins])
  const isPinned = pins.some((s) => encode(axes, s) === encode(axes, selection))
  return { selection, set, load, pins, pin, unpin, isPinned }
}

/** "Scale B Roles · Serif A Display only · Radius C Round" */
export function describe<A extends string>(axes: AxisDef<A>[], s: Selection<A>, meta: Record<A, Record<CandidateId, { name: string }>>): string {
  return axes.map((a) => `${a.label} ${s[a.axis].toUpperCase()} ${meta[a.axis][s[a.axis]].name}`).join(" · ")
}

export function PinButton({ pinned, onPin }: { pinned: boolean; onPin: () => void }) {
  return (
    <button
      type="button"
      onClick={onPin}
      disabled={pinned}
      className={cn(
        "ml-auto flex h-8 items-center gap-1.5 rounded-sm px-3 text-ui transition-interactive duration-fast ease-out press hairline",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        pinned ? "bg-accent-bg text-accent-text" : "bg-surface text-fg hover:bg-surface-hover",
      )}
    >
      <Pin className="size-3.5" strokeWidth={1.5} aria-hidden />
      {pinned ? "Pinned" : "Pin this combination"}
    </button>
  )
}

/** Pinned combinations rendered full size, one after another, so whole systems compare instead of one axis. */
export function Shortlist<A extends string>({ axes, pins, meta, current, onLoad, onUnpin, children }: {
  axes: AxisDef<A>[]
  pins: Selection<A>[]
  meta: Record<A, Record<CandidateId, { name: string }>>
  current: Selection<A>
  onLoad: (s: Selection<A>) => void
  onUnpin: (code: string) => void
  children: (s: Selection<A>, dark: boolean) => ReactNode
}) {
  if (pins.length === 0) {
    return (
      <p className="rounded-lg px-major py-minor text-ui text-fg-secondary hairline">
        Nothing pinned yet. Set the controls above to a combination you like and press <span className="text-fg-strong">Pin this combination</span>. Pinned
        combinations render here in full, one after another, and travel with the URL.
      </p>
    )
  }
  const currentCode = encode(axes, current)
  return (
    <div className="flex flex-col gap-12">
      {pins.map((s) => {
        const code = encode(axes, s)
        const active = code === currentCode
        return (
          <div key={code}>
            <div className="mb-minor flex h-8 items-center gap-major">
              <span className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">{code}</span>
              <span className="text-ui text-fg-strong">{describe(axes, s, meta)}</span>
              {active ? <span className="font-mono text-caption uppercase tracking-wider text-accent-text">current</span> : null}
              <button type="button" onClick={() => onLoad(s)} className="ml-auto h-8 rounded-sm px-3 text-ui text-fg hairline hover:bg-surface-hover transition-interactive duration-fast ease-out press">
                Load into controls
              </button>
              <button type="button" onClick={() => onUnpin(code)} aria-label="Unpin" className="flex size-8 items-center justify-center rounded-sm text-fg-secondary hover:bg-surface-hover hover:text-fg transition-interactive duration-fast ease-out press">
                <X className="size-4" strokeWidth={1.5} aria-hidden />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-major">
              <CandidateScope selection={s} className="rounded-xl bg-page p-major text-fg hairline">{children(s, false)}</CandidateScope>
              <CandidateScope selection={s} dark className="rounded-xl bg-page p-major text-fg hairline">{children(s, true)}</CandidateScope>
            </div>
          </div>
        )
      })}
    </div>
  )
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

export function Segmented({ label, value, options, onChange }: { label: string; value: CandidateId; options: { id: CandidateId; name: string; note?: string }[]; onChange: (id: CandidateId) => void }) {
  return (
    <div className="flex items-center gap-minor">
      <span className="w-16 font-mono text-caption uppercase tracking-wider text-fg-tertiary">{label}</span>
      <div role="radiogroup" aria-label={label} className="flex h-8 rounded-md bg-sunken p-1 hairline">
        {options.map((o) => {
          const active = o.id === value
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              title={o.note}
              onClick={() => onChange(o.id)}
              className={cn(
                "h-6 rounded-sm px-2 text-ui transition-interactive duration-fast ease-out press",
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
  return <div className="sticky top-0 z-10 -mx-major flex min-h-12 flex-wrap items-center gap-x-major gap-y-minor bg-page/90 px-major py-minor backdrop-blur hairline-b">{children}</div>
}

export function Section({ title, lede, children }: { title: string; lede: string; children: ReactNode }) {
  return (
    <section className="py-12 hairline-t">
      <div className="mb-major flex items-start gap-major">
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
            <div className="mb-minor flex h-6 items-center gap-2">
              <span className="font-mono text-caption text-fg-tertiary">{id.toUpperCase()}</span>
              <span className="text-ui font-medium text-fg-strong">{m.name}</span>
              {id === "a" ? <span className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">baseline</span> : null}
            </div>
            <CandidateScope selection={s} className="rounded-lg bg-page p-major text-fg hairline">
              {children(s)}
            </CandidateScope>
            {both ? (
              <CandidateScope selection={s} dark className="mt-minor rounded-lg bg-page p-major text-fg hairline">
                {children(s)}
              </CandidateScope>
            ) : null}
            <p className="mt-minor text-caption text-fg-secondary">{m.note}</p>
          </div>
        )
      })}
    </div>
  )
}
