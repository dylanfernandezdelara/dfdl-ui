"use client"

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

const TooltipProvider = BaseTooltip.Provider

/** A short label for a control that has no visible one. Put one TooltipProvider near the root so tooltips share a delay. */
function Tooltip({
  content,
  side = "top",
  children,
  className,
  ...props
}: ComponentProps<typeof BaseTooltip.Root> & { content: ReactNode; side?: "top" | "bottom" | "left" | "right"; children: ComponentProps<typeof BaseTooltip.Trigger>["render"]; className?: string }) {
  return (
    <BaseTooltip.Root {...props}>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={6}>
          <BaseTooltip.Popup data-slot="tooltip" className={cn("motion-tooltip rounded-xs bg-fg-strong px-2 py-1 text-caption text-fg-inverse", className)}>
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  )
}

export { Tooltip, TooltipProvider }
