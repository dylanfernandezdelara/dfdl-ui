"use client"

import { Switch as BaseSwitch } from "@base-ui/react/switch"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={cn(
        // A 24px box (on the control scale, so it centers on the grid) around the 20px track drawn by ::before.
        "relative inline-flex h-6 w-8 shrink-0 items-center rounded-full px-0.5",
        "before:absolute before:inset-x-0 before:inset-y-0.5 before:rounded-full before:bg-line-strong before:transition-interactive before:duration-fast before:ease-out",
        "data-checked:before:bg-accent-solid data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb className="relative size-4 rounded-full bg-page elevation-raised transition-transform duration-fast ease-out data-checked:translate-x-3" />
    </BaseSwitch.Root>
  )
}

export { Switch }
