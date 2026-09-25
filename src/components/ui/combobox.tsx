"use client"

import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import { Check, ChevronDown, X } from "lucide-react"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/** Pass `items` to the root; filtering is built in. Render the list with a function child: {(item) => <ComboboxItem …/>}. */
const Combobox = BaseCombobox.Root

function ComboboxInput({ className, placeholder, clearable = true, ...props }: ComponentProps<typeof BaseCombobox.Input> & { clearable?: boolean }) {
  return (
    <BaseCombobox.InputGroup
      data-slot="combobox-input"
      className={cn(
        "relative flex h-control w-full items-center rounded-sm bg-page hairline transition-interactive duration-fast ease-out",
        "focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline-focus",
        className,
      )}
    >
      <BaseCombobox.Input placeholder={placeholder} className="h-full min-w-0 flex-1 bg-transparent pl-2.5 text-ui text-fg outline-none placeholder:text-fg-tertiary" {...props} />
      <div className="flex items-center pr-1 text-fg-tertiary">
        {clearable ? (
          <BaseCombobox.Clear aria-label="Clear" className="flex size-6 items-center justify-center rounded-xs hover:text-fg-strong">
            <X className="size-4" strokeWidth={1.5} aria-hidden />
          </BaseCombobox.Clear>
        ) : null}
        <BaseCombobox.Trigger aria-label="Show options" className="flex size-6 items-center justify-center rounded-xs hover:text-fg-strong">
          <ChevronDown className="size-4" strokeWidth={1.5} aria-hidden />
        </BaseCombobox.Trigger>
      </div>
    </BaseCombobox.InputGroup>
  )
}

function ComboboxContent({ className, children, empty = "No results.", ...props }: ComponentProps<typeof BaseCombobox.List> & { empty?: string }) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={6} className="z-50">
        <BaseCombobox.Popup data-slot="combobox" className="motion-pop w-anchor rounded-md bg-raised p-1 elevation-floating outline-none">
          <BaseCombobox.Empty className="px-2 py-2 text-ui text-fg-tertiary empty:hidden">{empty}</BaseCombobox.Empty>
          <BaseCombobox.List className={cn("max-h-72 overflow-y-auto overscroll-contain outline-none data-empty:hidden", className)} {...props}>
            {children}
          </BaseCombobox.List>
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

function ComboboxItem({ className, children, ...props }: ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item"
      className={cn("flex h-8 cursor-default items-center gap-2 rounded-xs px-2 text-ui text-fg outline-none select-none data-highlighted:bg-surface-hover", className)}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <BaseCombobox.ItemIndicator>
        <Check className="size-4 text-accent-text" strokeWidth={2} aria-hidden />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
}

export { Combobox, ComboboxContent, ComboboxInput, ComboboxItem }
