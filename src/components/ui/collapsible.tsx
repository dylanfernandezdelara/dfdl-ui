"use client"

import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"
import { ChevronRight } from "lucide-react"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Collapsible = BaseCollapsible.Root

/** Trigger with a chevron that turns when open. Pass children for the label. */
function CollapsibleTrigger({ className, children, ...props }: ComponentProps<typeof BaseCollapsible.Trigger>) {
  return (
    <BaseCollapsible.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "group inline-flex h-8 items-center gap-1.5 rounded-sm px-2 text-ui text-fg-secondary transition-interactive duration-fast ease-out hover:bg-surface-hover hover:text-fg-strong",
        className,
      )}
      {...props}
    >
      <ChevronRight className="size-4 transition-icon duration-fast ease-out group-data-panel-open:rotate-90" strokeWidth={1.5} aria-hidden />
      {children}
    </BaseCollapsible.Trigger>
  )
}

/** Opens at once (height never animates); its content fades in. */
function CollapsibleContent({ className, ...props }: ComponentProps<typeof BaseCollapsible.Panel>) {
  return <BaseCollapsible.Panel data-slot="collapsible-content" className={cn("motion-reveal", className)} {...props} />
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
