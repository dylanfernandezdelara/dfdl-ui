import { Check, ChevronRight, Search } from "lucide-react"

import { cn } from "@/lib/utils"

/*
  Throwaway specimens for judging tokens in context. Not registry components; they exist so the lab
  shows colors on the surfaces they will actually live on. They use only semantic utilities.
*/

const control =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-sm px-3 text-ui font-medium transition-interactive duration-fast ease-out press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"

export function SolidButton({ children }: { children: React.ReactNode }) {
  return <button type="button" className={cn(control, "bg-accent-solid text-fg-on-accent hover:bg-accent-solid-hover")}>{children}</button>
}

export function TintedButton({ children }: { children: React.ReactNode }) {
  return <button type="button" className={cn(control, "border border-accent-border bg-accent-bg text-accent-text hover:bg-accent-border")}>{children}</button>
}

export function NeutralButton({ children }: { children: React.ReactNode }) {
  return <button type="button" className={cn(control, "bg-surface text-fg elevation-raised hover:bg-surface-hover")}>{children}</button>
}

export function GhostButton({ children }: { children: React.ReactNode }) {
  return <button type="button" className={cn(control, "text-fg-secondary hover:bg-surface-hover hover:text-fg")}>{children}</button>
}

export function TextInput({ focused }: { focused?: boolean }) {
  return (
    <label className="block">
      <span className="flex h-6 items-center text-caption font-medium text-fg-secondary">Search bills</span>
      <span
        className={cn(
          "flex h-8 items-center gap-2 rounded-md border bg-surface px-2.5 text-ui text-fg-tertiary",
          focused ? "border-focus outline-2 outline-focus/50" : "border-line",
        )}
      >
        <Search className="size-4" strokeWidth={1.5} aria-hidden />
        {focused ? <span className="text-fg">infra</span> : "Type to search…"}
      </span>
    </label>
  )
}

export function Paragraph() {
  return (
    <p className="max-w-reading text-body text-fg">
      I currently work on post-training and build RL environments for frontier coding agents. We recently launched{" "}
      <a href="#" className="text-accent-text underline decoration-accent-border underline-offset-2 hover:decoration-accent-solid">
        Muse Spark 1.3
      </a>{" "}
      and Muse Code. <span className="text-fg-secondary">Previously, I scaled crash infrastructure for Meta Glasses.</span>{" "}
      <span className="text-fg-tertiary">Updated Sep 2026.</span>
    </p>
  )
}

export function SelectableList() {
  const rows = ["Overview", "Federal control", "Chronological timeline", "Closest votes"]
  return (
    <ul className="w-56 shrink-0 rounded-lg bg-surface p-1 elevation-raised">
      {rows.map((r, i) => {
        const selected = i === 1
        return (
          <li
            key={r}
            className={cn(
              "flex h-8 items-center justify-between rounded-sm px-2 text-ui whitespace-nowrap",
              selected ? "bg-accent-bg text-accent-text" : "text-fg hover:bg-surface-hover",
            )}
          >
            {r}
            {selected ? <Check className="size-4" strokeWidth={2} aria-hidden /> : null}
          </li>
        )
      })}
    </ul>
  )
}

export function StatusBadges() {
  const b = "inline-flex h-6 items-center rounded-xs px-1.5 font-mono text-caption uppercase tracking-wider"
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={cn(b, "bg-accent-bg text-accent-text")}>Selected</span>
      <span className={cn(b, "text-fg-secondary hairline")}>Draft</span>
      <span className={cn(b, "text-success-text")}>Passed</span>
      <span className={cn(b, "text-danger-text")}>Failed</span>
      <span className={cn(b, "text-warning-text")}>Pending</span>
    </div>
  )
}

export function DataRow() {
  return (
    <div className="flex items-start gap-major py-3 hairline-t hairline-b">
      <div className="w-16 shrink-0 text-ui text-fg-tertiary">Sep 14</div>
      <div className="flex-1">
        <h3 className="font-heading text-heading text-fg-strong">Local Communities & Bird Habitat Stewardship Act</h3>
        <p className="text-ui text-fg-secondary">
          <span className="text-success-text">Passed</span> · 345–60 · House · H.R. 3276
        </p>
        <p className="text-body text-fg">
          Provides statutory authority for the Urban Bird Treaty Program, administered by the Fish and Wildlife Service.
        </p>
      </div>
      <ChevronRight className="mt-1 size-4 shrink-0 text-fg-tertiary" data-grid-ignore strokeWidth={1.5} aria-hidden />
    </div>
  )
}

export function RaisedCard() {
  return (
    <div className="w-64 shrink-0 rounded-lg bg-surface p-major elevation-raised">
      <p className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">Raised</p>
      <h3 className="mt-minor font-heading text-heading text-fg-strong">House passage</h3>
      <p className="text-ui text-fg-secondary">H.Res. 1499 · 210–208</p>
      <div className="mt-minor h-2 w-full overflow-hidden rounded-full bg-sunken">
        <div className="h-full w-1/2 rounded-full bg-accent-solid" />
      </div>
    </div>
  )
}

export function FloatingCard() {
  return (
    <div className="w-56 shrink-0 rounded-lg bg-raised p-1 elevation-floating">
      <p className="flex h-8 items-center px-2 font-mono text-caption uppercase tracking-wider text-fg-tertiary">Floating</p>
      {["Profile", "Settings", "Keyboard shortcuts"].map((r, i) => (
        <div key={r} className={cn("flex h-8 items-center rounded-sm px-2 text-ui", i === 0 ? "bg-surface-active text-fg-strong" : "text-fg")}>
          {r}
        </div>
      ))}
      <div className="flex h-8 items-center rounded-sm px-2 text-ui text-danger-text hairline-t">Delete</div>
    </div>
  )
}

/** Role swatch. Renders a semantic token by its utility class, so the swatch is the token, not a copy of it. */
export function Swatch({ className, label, sub }: { className: string; label: string; sub?: string }) {
  return (
    <div className="flex min-w-0 flex-col">
      <div className={cn("h-8 rounded-xs hairline", className)} />
      <span className="flex h-4 items-center truncate font-mono text-caption text-fg-secondary">{label}</span>
      <span className="flex h-4 items-center font-mono text-caption text-fg-tertiary">{sub ?? "\u00a0"}</span>
    </div>
  )
}
