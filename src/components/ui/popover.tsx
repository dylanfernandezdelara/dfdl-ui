"use client"

import { Popover as BasePopover } from "@base-ui/react/popover"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Popover = BasePopover.Root
const PopoverTrigger = BasePopover.Trigger
const PopoverClose = BasePopover.Close

function PopoverContent({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  ...props
}: ComponentProps<typeof BasePopover.Popup> & { side?: "top" | "bottom" | "left" | "right"; align?: "start" | "center" | "end"; sideOffset?: number }) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset} className="z-50">
        <BasePopover.Popup
          data-slot="popover"
          className={cn("motion-pop w-72 rounded-md bg-raised p-4 text-ui text-fg elevation-floating outline-none", className)}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

function PopoverTitle({ className, ...props }: ComponentProps<typeof BasePopover.Title>) {
  return <BasePopover.Title data-slot="popover-title" className={cn("text-ui font-medium text-fg-strong", className)} {...props} />
}

function PopoverDescription({ className, ...props }: ComponentProps<typeof BasePopover.Description>) {
  return <BasePopover.Description data-slot="popover-description" className={cn("text-ui text-fg-secondary", className)} {...props} />
}

export { Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger }
