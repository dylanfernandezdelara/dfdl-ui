"use client"

import { Grid3x3 } from "lucide-react"
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react"

import {
  LAYOUT_GRID_HOTKEY,
  LAYOUT_GRID_LINE_WIDTH_PX,
  LAYOUT_GRID_MAJOR_PX,
  LAYOUT_GRID_MINOR_PX,
  getServerLayoutGrid,
  isGridAuditHotkey,
  isLayoutGridHotkey,
  readLayoutGrid,
  subscribeLayoutGrid,
  toggleLayoutGrid,
} from "@/lib/layout-grid"
import { clearOffenders, markOffenders } from "@/lib/grid-audit"
import { cn } from "@/lib/utils"

import "./layout-grid.css"

/**
 * Baseline grid overlay for checking rhythm. Off by default. Toggle with `g`, the button, or `?grid=1`.
 * Shift+G runs the grid audit: every block whose top, height or left edge misses the 4px half-step is
 * outlined and carries the reason in its title. Ships with the docs site so every lab and component page
 * can be checked against the 8/24 grid.
 */
export function LayoutGridHost({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(subscribeLayoutGrid, readLayoutGrid, getServerLayoutGrid)
  const [audit, setAudit] = useState<{ checked: number; marked: number } | null>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isGridAuditHotkey(event)) {
        event.preventDefault()
        setAudit((current) => {
          if (current) {
            clearOffenders()
            return null
          }
          return markOffenders()
        })
        return
      }
      if (!isLayoutGridHotkey(event)) return
      event.preventDefault()
      toggleLayoutGrid()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      {children}
      {enabled ? <div data-layout-grid-overlay="" aria-hidden /> : null}
      <div data-layout-grid-toolbar="">
        {audit ? (
          <p data-layout-grid-legend="" data-audit="" aria-live="polite">
            {`${audit.marked} of ${audit.checked} blocks off grid · shift+g to clear`}
          </p>
        ) : null}
        {enabled ? (
          <p data-layout-grid-legend="" aria-hidden>
            {`${LAYOUT_GRID_MINOR_PX} / ${LAYOUT_GRID_MAJOR_PX} · ${LAYOUT_GRID_LINE_WIDTH_PX}px`}
          </p>
        ) : null}
        <button
          type="button"
          onClick={toggleLayoutGrid}
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface elevation-raised",
            "transition-interactive duration-fast ease-out press",
            "hover:bg-surface-hover",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
            enabled ? "text-fg-strong" : "text-fg-secondary hover:text-fg",
          )}
          aria-label={enabled ? "Hide layout grid" : "Show layout grid"}
          aria-pressed={enabled}
          aria-keyshortcuts={`${LAYOUT_GRID_HOTKEY} Shift+${LAYOUT_GRID_HOTKEY.toUpperCase()}`}
          title="g: grid · shift+g: audit"
        >
          <Grid3x3 className="size-4" strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    </>
  )
}
