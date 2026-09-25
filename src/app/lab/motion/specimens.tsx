"use client"

import { Bell, Check, ChevronDown, Copy, GitFork, Pencil, RotateCw, Trash2 } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

import "./specimens.css"

/*
  Interactive specimens for Lab 3. Real state, real clicks, real transitions, so the probe measures what runs.
  Every open/close is a state flip on an always-mounted element; enter starts live in @starting-style.
*/

const control =
  "spec-press inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 text-ui font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"

export function PressRow({ pressed }: { pressed?: boolean }) {
  const p = pressed ? "" : undefined
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" data-pressed={p} className={cn(control, "bg-accent-solid text-fg-on-accent hover:bg-accent-solid-hover")}>Save changes</button>
      <button type="button" data-pressed={p} className={cn(control, "bg-surface text-fg elevation-raised hover:bg-surface-hover")}>Cancel</button>
      <button type="button" data-pressed={p} className={cn(control, "text-fg-secondary hover:bg-surface-hover hover:text-fg")}>Learn more</button>
      <button type="button" data-pressed={p} aria-label="Copy" className={cn(control, "w-8 bg-surface px-0 text-fg-secondary elevation-raised hover:bg-surface-hover hover:text-fg")}>
        <Copy className="size-4" strokeWidth={1.5} aria-hidden />
      </button>
      {pressed === undefined ? <span className="text-caption text-fg-tertiary">Press and hold to see the scale.</span> : null}
    </div>
  )
}

/** Local open state unless a parent drives it (synchronized comparisons). */
function useOpen(controlled?: boolean) {
  const [local, setLocal] = useState(false)
  const open = controlled ?? local
  return { open, toggle: () => setLocal((o) => !o), set: setLocal }
}

export type Controlled = { open?: boolean }

export function PopoverSpec({ open: controlled }: Controlled) {
  const { open, toggle, set } = useOpen(controlled)
  return (
    <div className="relative inline-block">
      <button type="button" onClick={toggle} aria-expanded={open} className={cn(control, "bg-surface text-fg elevation-raised hover:bg-surface-hover")}>
        Chat options <ChevronDown className="size-4 text-fg-tertiary" strokeWidth={1.5} aria-hidden />
      </button>
      <div role="menu" data-state={open ? "open" : "closed"} className="spec-popover absolute top-full left-0 z-10 mt-minor w-52 rounded-md bg-raised p-1 elevation-floating">
        {[
          ["Rename", Pencil],
          ["Fork from here", GitFork],
          ["Regenerate", RotateCw],
        ].map(([label, Icon]) => (
          <button key={label as string} type="button" role="menuitem" onClick={() => set(false)} className="flex h-8 w-full items-center gap-2 rounded-xs px-2 text-ui text-fg hover:bg-surface-hover">
            <Icon className="size-4 text-fg-tertiary" strokeWidth={1.5} aria-hidden /> {label as string}
          </button>
        ))}
        <button type="button" role="menuitem" onClick={() => set(false)} className="flex h-8 w-full items-center gap-2 rounded-xs px-2 text-ui text-danger-text hover:bg-danger-bg">
          <Trash2 className="size-4" strokeWidth={1.5} aria-hidden /> Delete
        </button>
      </div>
    </div>
  )
}

export function TooltipSpec() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label="Notifications"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className={cn(control, "w-8 bg-surface px-0 text-fg-secondary elevation-raised hover:bg-surface-hover hover:text-fg")}
      >
        <Bell className="size-4" strokeWidth={1.5} aria-hidden />
      </button>
      <div role="tooltip" data-state={open ? "open" : "closed"} className="spec-tooltip absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-xs bg-fg-strong px-2 py-1 text-caption text-fg-inverse">
        Notifications
      </div>
    </div>
  )
}

/** Dialog constrained to a frame so it can sit inline on the lab page. */
export function DialogSpec({ open: controlled }: Controlled) {
  const { open, toggle, set } = useOpen(controlled)
  return (
    <div className="relative h-56 overflow-hidden rounded-lg bg-page hairline">
      <div className="p-major">
        <p className="text-ui text-fg-secondary">Workspace · Settings</p>
        <button type="button" onClick={toggle} className={cn(control, "mt-minor bg-surface text-fg elevation-raised hover:bg-surface-hover")}>
          Delete workspace
        </button>
      </div>
      <div data-state={open ? "open" : "closed"} className="spec-backdrop absolute inset-0 bg-overlay" onClick={() => set(false)} />
      <div role="dialog" aria-modal="true" data-state={open ? "open" : "closed"} className="spec-dialog absolute inset-x-8 top-1/2 -translate-y-1/2 rounded-lg bg-raised p-major elevation-floating">
        <h3 className="font-heading text-heading text-fg-strong">Delete this workspace?</h3>
        <p className="mt-minor text-ui text-fg-secondary">All 128 chats and their forks go with it. This cannot be undone.</p>
        <div className="mt-minor flex justify-end gap-2">
          <button type="button" onClick={() => set(false)} className={cn(control, "bg-surface text-fg hairline hover:bg-surface-hover")}>Cancel</button>
          <button type="button" onClick={() => set(false)} className={cn(control, "bg-danger text-fg-on-accent")}>Delete</button>
        </div>
      </div>
    </div>
  )
}

/** Bottom sheet inside a phone-shaped frame. */
export function DrawerSpec({ open: controlled }: Controlled) {
  const { open, toggle, set } = useOpen(controlled)
  return (
    <div className="relative h-72 w-44 overflow-hidden rounded-xl bg-page hairline">
      <div className="p-minor">
        <p className="text-caption text-fg-tertiary">Fork</p>
        <button type="button" onClick={toggle} className={cn(control, "mt-minor w-full bg-surface text-fg elevation-raised hover:bg-surface-hover")}>
          Model
        </button>
      </div>
      <div data-state={open ? "open" : "closed"} className="spec-backdrop absolute inset-0 bg-overlay" onClick={() => set(false)} />
      <div role="dialog" data-state={open ? "open" : "closed"} className="spec-drawer absolute inset-x-0 bottom-0 rounded-t-lg bg-raised p-minor elevation-floating">
        <div className="mx-auto mb-minor h-1 w-8 rounded-full bg-line-strong" data-grid-ignore />
        {["Muse Spark 1.3", "GPT-5.6 Luna"].map((m, i) => (
          <button key={m} type="button" onClick={() => set(false)} className="flex h-8 w-full items-center justify-between rounded-xs px-2 text-ui text-fg hover:bg-surface-hover">
            {m} {i === 0 ? <Check className="size-4 text-accent-text" strokeWidth={2} aria-hidden /> : null}
          </button>
        ))}
      </div>
    </div>
  )
}

export function TabsSpec() {
  const tabs = ["Overview", "Federal control", "Timeline", "Votes"]
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null)
  const measure = useCallback(() => {
    const el = refs.current[active]
    if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth })
  }, [active])
  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])
  return (
    <div className="relative flex gap-1 hairline-b">
      {tabs.map((t, i) => (
        <button
          key={t}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="button"
          role="tab"
          aria-selected={i === active}
          onClick={() => setActive(i)}
          className={cn("h-8 px-2 text-ui transition-interactive duration-fast ease-out", i === active ? "text-fg-strong" : "text-fg-secondary hover:text-fg")}
        >
          {t}
        </button>
      ))}
      {/* Rendered only once measured, so the first paint does not animate the bar in from zero. */}
      {ind ? <span aria-hidden data-grid-ignore className="spec-tab-indicator absolute bottom-0 left-0 h-0.5 rounded-full bg-fg-strong" style={{ "--tab-x": `${ind.x}px`, "--tab-w": `${ind.w}px` } as React.CSSProperties} /> : null}
    </div>
  )
}

export function SwitchSpec() {
  const [on, setOn] = useState(true)
  return (
    <label className="flex items-center gap-2 text-ui text-fg">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((o) => !o)}
        className={cn("spec-switch spec-press relative h-5 w-9 rounded-full", on ? "bg-accent-solid" : "bg-line-strong")}
      >
        <span data-grid-ignore className={cn("spec-switch-thumb absolute top-0.5 left-0.5 size-4 rounded-full bg-raised elevation-raised", on && "translate-x-4")} />
      </button>
      Web search
    </label>
  )
}

export function ToastSpec({ open: controlled }: Controlled) {
  const { open, set } = useOpen(controlled)
  useEffect(() => {
    if (!open || controlled !== undefined) return
    const t = setTimeout(() => set(false), 2400)
    return () => clearTimeout(t)
  }, [open, controlled, set])
  return (
    <div className="relative h-24 overflow-hidden rounded-lg bg-page p-minor hairline">
      <button type="button" onClick={() => set(true)} className={cn(control, "bg-surface text-fg elevation-raised hover:bg-surface-hover")}>
        Copy link
      </button>
      <div role="status" data-state={open ? "open" : "closed"} className="spec-toast absolute bottom-minor left-minor flex items-center gap-2 rounded-md bg-fg-strong px-3 py-2 text-ui text-fg-inverse elevation-floating">
        <Check className="size-4" strokeWidth={2} aria-hidden /> Link copied
      </div>
    </div>
  )
}

export function Board({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-major">{children}</div>
}
