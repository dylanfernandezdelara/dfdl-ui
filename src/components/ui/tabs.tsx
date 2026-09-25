"use client"

import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { useEffect, useRef, type ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Tabs({ className, ...props }: ComponentProps<typeof BaseTabs.Root>) {
  return <BaseTabs.Root data-slot="tabs" className={cn("flex flex-col gap-major", className)} {...props} />
}

/*
  The indicator is a 1px bar scaled to the active tab's width and translated to its left edge, so only transform
  animates. Measured here rather than read from Base UI's --active-tab-* lengths, because scale needs a number.
*/
function TabsList({ className, children, ...props }: ComponentProps<typeof BaseTabs.List>) {
  const list = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = list.current
    if (!el) return
    const measure = () => {
      const tab = el.querySelector<HTMLElement>("[data-active]")
      if (!tab || !bar.current) return
      bar.current.style.setProperty("--tab-x", `${tab.offsetLeft}px`)
      bar.current.style.setProperty("--tab-w", `${tab.offsetWidth}`)
      bar.current.dataset.ready = ""
    }
    measure()
    document.fonts.ready.then(measure)
    const resize = new ResizeObserver(measure)
    resize.observe(el)
    const mutate = new MutationObserver(measure)
    mutate.observe(el, { attributes: true, subtree: true, attributeFilter: ["data-active"] })
    return () => {
      resize.disconnect()
      mutate.disconnect()
    }
  }, [])
  return (
    <BaseTabs.List ref={list} data-slot="tabs-list" className={cn("relative flex items-center gap-1 hairline-b", className)} {...props}>
      {children}
      <span ref={bar} aria-hidden className="tabs-indicator absolute bottom-0 left-0 h-0.5 bg-fg-strong" />
    </BaseTabs.List>
  )
}

function TabsTab({ className, ...props }: ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      data-slot="tabs-tab"
      className={cn(
        "inline-flex h-control items-center gap-1.5 rounded-xs px-2 text-ui text-fg-secondary transition-interactive duration-fast ease-out select-none",
        "hover:text-fg-strong data-active:text-fg-strong data-disabled:opacity-50 [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function TabsPanel({ className, ...props }: ComponentProps<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel data-slot="tabs-panel" className={cn("text-body text-fg", className)} {...props} />
}

export { Tabs, TabsList, TabsPanel, TabsTab }
