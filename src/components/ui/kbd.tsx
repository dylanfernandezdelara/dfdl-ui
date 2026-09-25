import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn("inline-flex h-5 min-w-5 items-center justify-center rounded-xs bg-sunken px-1 font-sans text-caption text-fg-secondary hairline", className)}
      {...props}
    />
  )
}

export { Kbd }
