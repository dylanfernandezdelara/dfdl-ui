"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export type CandidateId = "a" | "b" | "c"
export type Axis = "neutral" | "accent" | "depth"
export type Selection = Record<Axis, CandidateId>

export const AXES: { axis: Axis; param: string; label: string }[] = [
  { axis: "neutral", param: "n", label: "Neutral" },
  { axis: "accent", param: "a", label: "Accent" },
  { axis: "depth", param: "d", label: "Depth" },
]

function readSelection(params: URLSearchParams): Selection {
  const pick = (p: string): CandidateId => {
    const v = params.get(p)
    return v === "b" || v === "c" ? v : "a"
  }
  return { neutral: pick("n"), accent: pick("a"), depth: pick("d") }
}

export function useSelection() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const selection = readSelection(params)
  const set = useCallback(
    (axis: Axis, id: CandidateId) => {
      const next = new URLSearchParams(params.toString())
      const param = AXES.find((a) => a.axis === axis)!.param
      if (id === "a") next.delete(param)
      else next.set(param, id)
      const qs = next.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [params, router, pathname],
  )
  return { selection, set }
}

/** Applies the chosen candidates to everything inside. */
export function CandidateScope({ selection, className, children, dark }: { selection: Selection; className?: string; children: ReactNode; dark?: boolean }) {
  return (
    <div
      data-neutral={selection.neutral}
      data-accent={selection.accent}
      data-depth={selection.depth}
      className={cn(dark && "dark", className)}
    >
      {children}
    </div>
  )
}

export function Segmented({ label, value, options, onChange }: { label: string; value: CandidateId; options: { id: CandidateId; name: string }[]; onChange: (id: CandidateId) => void }) {
  return (
    <div className="flex items-center gap-minor">
      <span className="w-16 font-mono text-xs uppercase tracking-wider text-fg-tertiary">{label}</span>
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
                "h-7 rounded-sm px-2.5 text-sm transition-interactive duration-fast ease-out press",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                active ? "bg-surface text-fg-strong elevation-raised" : "text-fg-secondary hover:text-fg",
              )}
            >
              <span className="font-mono text-xs text-fg-tertiary">{o.id.toUpperCase()}</span> {o.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
