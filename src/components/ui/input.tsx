import { Input as BaseInput } from "@base-ui/react/input"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Input({ className, ...props }: ComponentProps<typeof BaseInput>) {
  return (
    <BaseInput
      data-slot="input"
      className={cn(
        "h-control w-full min-w-0 rounded-sm bg-page px-2.5 text-ui text-fg hairline transition-interactive duration-fast ease-out",
        "placeholder:text-fg-tertiary focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50 aria-invalid:outline-2 aria-invalid:outline-danger",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
