import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type Step = { step: number; hex: string; oklch: string }

const ROLES: Record<number, string> = {
  1: "page", 2: "subtle", 3: "component", 4: "hover", 5: "active", 6: "subtle border",
  7: "border", 8: "strong border", 9: "solid", 10: "solid hover", 11: "text", 12: "high-contrast text",
}

/** A 12-step ramp with step numbers and Radix role names. Colors come from generated data, not CSS classes. */
export function Ramp({ steps, name, roles = true, className }: { steps: Step[]; name: string; roles?: boolean; className?: string }) {
  return (
    <figure className={className}>
      <figcaption className="flex h-6 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">{name}</figcaption>
      <div className="mt-minor grid grid-cols-12 gap-1">
        {steps.map((s) => (
          <div key={s.step} className="min-w-0">
            <div className="h-10 rounded-xs swatch hairline" style={{ "--swatch": s.oklch } as CSSProperties} title={`${s.oklch} · ${s.hex}`} />
            <p className="mt-1 truncate font-mono text-caption tabular-nums text-fg-tertiary">{s.step}</p>
            {roles ? <p className="hidden truncate text-caption text-fg-secondary xl:block">{ROLES[s.step]}</p> : null}
          </div>
        ))}
      </div>
    </figure>
  )
}

/** Semantic role swatch rendered through its utility class, so it is the live token. */
export function RoleSwatch({ className, name, note }: { className: string; name: string; note?: string }) {
  return (
    <div className="flex items-center gap-minor">
      <div className={cn("size-8 shrink-0 rounded-xs hairline", className)} />
      <div className="min-w-0">
        <p className="truncate font-mono text-caption text-fg">{name}</p>
        {note ? <p className="truncate text-caption text-fg-tertiary">{note}</p> : null}
      </div>
    </div>
  )
}
