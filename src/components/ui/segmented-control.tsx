"use client"

import { Toggle } from "@base-ui/react/toggle"
import { ToggleGroup } from "@base-ui/react/toggle-group"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/** One choice from a few, shown all at once. Single selection; the pressed item cannot be unpressed. */
function SegmentedControl({
  className,
  value,
  defaultValue,
  onValueChange,
  ...props
}: Omit<ComponentProps<typeof ToggleGroup>, "value" | "defaultValue" | "onValueChange" | "multiple"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <ToggleGroup
      data-slot="segmented-control"
      value={value === undefined ? undefined : [value]}
      defaultValue={defaultValue === undefined ? undefined : [defaultValue]}
      onValueChange={(v) => v[0] !== undefined && onValueChange?.(v[0] as string)}
      className={cn("inline-flex h-control items-center gap-0.5 rounded-sm bg-sunken p-0.5 hairline", className)}
      {...props}
    />
  )
}

function SegmentedControlItem({ className, ...props }: ComponentProps<typeof Toggle>) {
  return (
    <Toggle
      data-slot="segmented-control-item"
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-xs px-2.5 text-ui text-fg-secondary transition-interactive duration-fast ease-out select-none",
        "hover:text-fg-strong data-pressed:bg-surface data-pressed:text-fg-strong data-pressed:elevation-raised [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  )
}

export { SegmentedControl, SegmentedControlItem }
