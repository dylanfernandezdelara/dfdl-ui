"use client"

import { Play } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

import { CandidateScope, IDS, type AxisDef, type CandidateId, type Selection } from "../_shared/candidates"

/*
  The decision surface. One Play button per axis fires all three candidates at the same instant, at quarter
  speed by default, so the comparison is simultaneous rather than sequential. Each axis names a recommendation
  and the reason; "Accept recommended" loads it into the controls.
*/

type Axis = "curve" | "exit" | "press"

export const RECOMMENDED: Selection<Axis> = { curve: "a", exit: "a", press: "a" }

export const WHY: Record<Axis, string> = {
  curve:
    "A, approved. Emil's curve spends most of the distance in the first third, so the menu is already where it is going by the time you look; B (Fork's previous `ease`) starts slow, which reads as lag. C is a softer version of A. Every reference site in the audit uses a strong ease-out.",
  exit:
    "A, approved. Leaving should be quicker than arriving: the user has already decided. 75% keeps the path symmetric so a menu closes into its trigger. C's fade-only exit is what you want for toasts, and it is the reduced-motion behaviour, but as the default it loses the sense of where things went.",
  press:
    "A, approved. 0.97 is the smallest scale that still registers as a press; most people cannot name it but miss it when it is gone. 0.94 is visible on icon buttons, which is too much for something that fires tens of times a day. None is fine, but 0.97 is the whole audit's consensus.",
}

/** Cubic bezier sampled for an SVG path. */
function bezierPath(x1: number, y1: number, x2: number, y2: number, w: number, h: number) {
  const pts: string[] = []
  for (let i = 0; i <= 40; i++) {
    const t = i / 40
    const mt = 1 - t
    const x = 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t
    const y = 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t
    pts.push(`${(x * w).toFixed(1)},${((1 - y) * h).toFixed(1)}`)
  }
  return "M" + pts.join(" L")
}

const CURVES: Record<CandidateId, { label: string; enter: [number, number, number, number] }> = {
  a: { label: "0.23, 1, 0.32, 1", enter: [0.23, 1, 0.32, 1] },
  b: { label: "0.25, 0.1, 0.25, 1", enter: [0.25, 0.1, 0.25, 1] },
  c: { label: "0, 0, 0.2, 1", enter: [0, 0, 0.2, 1] },
}

export function CurvePlot({ id }: { id: CandidateId }) {
  const c = CURVES[id]
  const w = 120
  const h = 72
  return (
    <figure className="flex items-center gap-minor">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0 overflow-visible" aria-hidden>
        <line x1="0" y1={h} x2={w} y2={h} className="stroke-line" />
        <line x1="0" y1="0" x2="0" y2={h} className="stroke-line" />
        <line x1={w / 3} y1="0" x2={w / 3} y2={h} className="stroke-line-subtle" strokeDasharray="2 3" />
        <path d={bezierPath(...c.enter, w, h)} fill="none" className="stroke-accent-solid" strokeWidth="2" />
      </svg>
      <figcaption className="font-mono text-caption text-fg-tertiary">
        {id === "b" ? "ease = " : ""}cubic-bezier({c.label})
        <br />
        <span className="text-fg-secondary">dashed line = first third of the time</span>
      </figcaption>
    </figure>
  )
}

/** Fires open on all three at once, holds, then closes. Repeats while the row is playing. */
export function useSyncPlay(holdMs: number, cycleMs: number) {
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!playing) return
    let cancelled = false
    const run = () => {
      if (cancelled) return
      setOpen(true)
      timer.current = setTimeout(() => {
        setOpen(false)
        timer.current = setTimeout(() => {
          setPlaying(false)
        }, cycleMs - holdMs)
      }, holdMs)
    }
    run()
    return () => {
      cancelled = true
      if (timer.current) clearTimeout(timer.current)
    }
  }, [playing, holdMs, cycleMs])
  return { open, playing, play: () => setPlaying(true) }
}

export function SyncRow<A extends string>({
  axis,
  axes,
  selection,
  meta,
  recommended,
  speed,
  onSpeed,
  playLabel,
  hold,
  children,
}: {
  axis: Axis
  axes: AxisDef<A>[]
  selection: Selection<A>
  meta: Record<CandidateId, { name: string; note: string }>
  recommended: CandidateId
  speed: "normal" | "quarter" | "slow"
  onSpeed: (s: "normal" | "quarter" | "slow") => void
  playLabel: string
  hold: number
  children: (s: Selection<A>, open: boolean) => ReactNode
}) {
  const factor = speed === "slow" ? 10 : speed === "quarter" ? 4 : 1
  const { open, playing, play } = useSyncPlay(hold * factor, hold * factor * 2)
  void axes
  return (
    <div data-speed={speed}>
      <div className="mb-minor flex min-h-8 flex-wrap items-center gap-major">
        <button
          type="button"
          onClick={play}
          disabled={playing}
          className={cn(
            "flex h-control items-center gap-1.5 rounded-sm bg-accent-solid px-3 text-ui font-medium text-fg-on-accent transition-interactive duration-fast ease-out press disabled:opacity-60",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
          )}
        >
          <Play className="size-3.5" strokeWidth={2} aria-hidden /> {playing ? "Playing…" : playLabel}
        </button>
        <div role="radiogroup" aria-label="Speed" className="flex h-8 rounded-md bg-sunken p-1 hairline">
          {(["normal", "quarter", "slow"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={speed === v}
              onClick={() => onSpeed(v)}
              className={cn(
                "h-6 rounded-sm px-2 text-caption transition-interactive duration-fast ease-out press",
                speed === v ? "bg-surface text-fg-strong elevation-raised" : "text-fg-secondary hover:text-fg",
              )}
            >
              {v === "normal" ? "1×" : v === "quarter" ? "¼×" : "⅒×"}
            </button>
          ))}
        </div>
        <span className="text-caption text-fg-tertiary">All three fire at the same instant. Watch them as a group, then pick the one that felt right.</span>
      </div>
      <div className="grid grid-cols-3 gap-major">
        {IDS.map((id) => {
          const s = { ...selection, [axis]: id } as Selection<A>
          const isRec = id === recommended
          const isSel = selection[axis as unknown as A] === id
          return (
            <div key={id} className="min-w-0">
              <div className="mb-minor flex h-6 items-center gap-2">
                <span className="font-mono text-caption text-fg-tertiary">{id.toUpperCase()}</span>
                <span className="text-ui font-medium text-fg-strong">{meta[id].name}</span>
                {isRec ? <span className="rounded-full bg-accent-bg px-1.5 font-mono text-caption uppercase tracking-wider text-accent-text">recommended</span> : null}
                {isSel ? <span className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">selected</span> : null}
              </div>
              <CandidateScope selection={s} className={cn("rounded-lg bg-page p-major text-fg", isSel ? "outline outline-1 -outline-offset-1 outline-accent-border" : "hairline")}>
                {children(s, open)}
              </CandidateScope>
              <p className="mt-minor text-caption text-fg-secondary">{meta[id].note}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
