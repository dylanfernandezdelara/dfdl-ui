"use client"

import { Toggle } from "@base-ui/react/toggle"
import { ToggleGroup } from "@base-ui/react/toggle-group"
import { createContext, useContext, type ComponentProps } from "react"

import { cn } from "@/lib/utils"

type Variant = "pill" | "underline"

const VariantContext = createContext<Variant>("pill")

/**
 * One choice from a few, shown all at once. Single selection; the pressed item cannot be unpressed.
 * `pill` (default) sits in a sunken track; `underline` is a bare row with a line under the choice, for dense
 * toolbars.
 */
function SegmentedControl({
  className,
  value,
  defaultValue,
  onValueChange,
  variant = "pill",
  ...props
}: Omit<ComponentProps<typeof ToggleGroup>, "value" | "defaultValue" | "onValueChange" | "multiple"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  variant?: Variant
}) {
  return (
    <VariantContext.Provider value={variant}>
      <ToggleGroup
        data-slot="segmented-control"
        data-variant={variant}
        value={value === undefined ? undefined : [value]}
        defaultValue={defaultValue === undefined ? undefined : [defaultValue]}
        onValueChange={(v) => v[0] !== undefined && onValueChange?.(v[0] as string)}
        className={cn(
          variant === "pill" && "inline-flex h-control items-center gap-0.5 rounded-sm bg-sunken p-0.5 hairline",
          variant === "underline" && "inline-flex h-control items-stretch hairline-b",
          className,
        )}
        {...props}
      />
    </VariantContext.Provider>
  )
}

function SegmentedControlItem({ className, ...props }: ComponentProps<typeof Toggle>) {
  const variant = useContext(VariantContext)
  return (
    <Toggle
      data-slot="segmented-control-item"
      className={cn(
        "inline-flex items-center gap-1.5 text-ui transition-interactive duration-fast ease-out select-none [&_svg]:size-4",
        variant === "pill" &&
          "h-7 rounded-xs px-2.5 text-fg-secondary hover:text-fg-strong data-pressed:bg-surface data-pressed:text-fg-strong data-pressed:elevation-raised",
        variant === "underline" &&
          "px-3 text-fg-tertiary hover:text-fg-secondary data-pressed:font-medium data-pressed:text-fg-strong data-pressed:hairline-b-strong",
        className,
      )}
      {...props}
    />
  )
}

export { SegmentedControl, SegmentedControlItem }
