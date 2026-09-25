"use client"

import { Switch as BaseSwitch } from "@base-ui/react/switch"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={cn(
        "inline-flex h-5 w-8 shrink-0 items-center rounded-full bg-line-strong p-0.5 transition-interactive duration-fast ease-out",
        "data-checked:bg-accent-solid data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb className="size-4 rounded-full bg-page elevation-raised transition-transform duration-fast ease-out data-checked:translate-x-3" />
    </BaseSwitch.Root>
  )
}

export { Switch }
