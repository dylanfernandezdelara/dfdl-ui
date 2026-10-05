"use client"

import { Autocomplete } from "@base-ui/react/autocomplete"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { Search } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * The palette: an Autocomplete whose list is always open and rendered in place, with the first match highlighted.
 * Pass `items` (flat, or groups of `{ items }`); filtering is built in. Render the list with a function child.
 */
const Command = function Command(props: ComponentProps<typeof Autocomplete.Root>) {
  return <Autocomplete.Root inline open autoHighlight="always" {...props} />
} as typeof Autocomplete.Root

/** A modal palette near the top of the screen. It opens and closes without animation: it is keyboard-triggered and used many times a day. */
function CommandDialog({ title = "Search", className, children, ...props }: Omit<ComponentProps<typeof BaseDialog.Root>, "children"> & { title?: string; className?: string; children: ReactNode }) {
  return (
    <BaseDialog.Root {...props}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-overlay" />
        <BaseDialog.Popup
          data-slot="command-dialog"
          className={cn("fixed inset-x-4 top-24 z-50 mx-auto flex max-w-lg flex-col overflow-hidden rounded-lg bg-raised elevation-floating outline-none", className)}
        >
          <BaseDialog.Title className="sr-only">{title}</BaseDialog.Title>
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

function CommandInput({ className, ...props }: ComponentProps<typeof Autocomplete.Input>) {
  return (
    <div data-slot="command-input" className="flex h-12 shrink-0 items-center gap-2 px-4 hairline-b">
      <Search className="size-4 shrink-0 text-fg-tertiary" strokeWidth={1.5} aria-hidden />
      <Autocomplete.Input className={cn("h-full min-w-0 flex-1 bg-transparent text-ui text-fg outline-none placeholder:text-fg-tertiary", className)} {...props} />
    </div>
  )
}

function CommandList({ className, ...props }: ComponentProps<typeof Autocomplete.List>) {
  return <Autocomplete.List data-slot="command-list" className={cn("max-h-80 scroll-py-1 overflow-y-auto overscroll-contain p-1 outline-none data-empty:hidden", className)} {...props} />
}

function CommandEmpty({ className, children = "No results.", ...props }: ComponentProps<typeof Autocomplete.Empty>) {
  return (
    <Autocomplete.Empty data-slot="command-empty" className={cn("flex h-12 items-center justify-center text-ui text-fg-tertiary empty:hidden", className)} {...props}>
      {children}
    </Autocomplete.Empty>
  )
}

/** One group of a grouped `items` list: pass the group's items, then a label and a CommandCollection. */
function CommandGroup({ className, ...props }: ComponentProps<typeof Autocomplete.Group>) {
  return <Autocomplete.Group data-slot="command-group" className={cn("not-first:pt-1", className)} {...props} />
}

function CommandGroupLabel({ className, ...props }: ComponentProps<typeof Autocomplete.GroupLabel>) {
  return <Autocomplete.GroupLabel data-slot="command-group-label" className={cn("flex h-7 items-center px-2 text-caption text-fg-tertiary", className)} {...props} />
}

const CommandCollection = Autocomplete.Collection

function CommandItem({ className, ...props }: ComponentProps<typeof Autocomplete.Item>) {
  return (
    <Autocomplete.Item
      data-slot="command-item"
      className={cn(
        // rounded-md: the palette is rounded-lg (16) with 4px of list padding, so the row is 12.
        "flex h-8 cursor-default items-center gap-2 rounded-md px-2 text-ui text-fg outline-none select-none data-highlighted:bg-raised-hover [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fg-tertiary",
        className,
      )}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="command-shortcut" className={cn("ml-auto flex items-center gap-1 text-caption text-fg-tertiary", className)} {...props} />
}

export { Command, CommandCollection, CommandDialog, CommandEmpty, CommandGroup, CommandGroupLabel, CommandInput, CommandItem, CommandList, CommandShortcut }
