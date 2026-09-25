"use client"

import { Menu as BaseMenu } from "@base-ui/react/menu"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Menu = BaseMenu.Root
const MenuTrigger = BaseMenu.Trigger
const MenuGroup = BaseMenu.Group

function MenuContent({ className, align = "start", sideOffset = 6, ...props }: ComponentProps<typeof BaseMenu.Popup> & { align?: "start" | "center" | "end"; sideOffset?: number }) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner align={align} sideOffset={sideOffset} className="z-50">
        <BaseMenu.Popup data-slot="menu" className={cn("motion-pop min-w-48 rounded-md bg-raised p-1 elevation-floating outline-none", className)} {...props} />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

function MenuItem({ className, variant = "default", ...props }: ComponentProps<typeof BaseMenu.Item> & { variant?: "default" | "danger" }) {
  return (
    <BaseMenu.Item
      data-slot="menu-item"
      className={cn(
        "flex h-8 cursor-default items-center gap-2 rounded-xs px-2 text-ui outline-none select-none [&_svg]:size-4 [&_svg]:text-fg-tertiary",
        variant === "danger" ? "text-danger-text data-highlighted:bg-danger-bg [&_svg]:text-danger-text" : "text-fg data-highlighted:bg-surface-hover",
        "data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function MenuLabel({ className, ...props }: ComponentProps<typeof BaseMenu.GroupLabel>) {
  return <BaseMenu.GroupLabel data-slot="menu-label" className={cn("flex h-7 items-center px-2 text-caption text-fg-tertiary", className)} {...props} />
}

function MenuSeparator({ className, ...props }: ComponentProps<typeof BaseMenu.Separator>) {
  return <BaseMenu.Separator data-slot="menu-separator" className={cn("mx-1 my-1 h-px bg-separator", className)} {...props} />
}

function MenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="menu-shortcut" className={cn("ml-auto text-caption text-fg-tertiary", className)} {...props} />
}

export { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuShortcut, MenuTrigger }
