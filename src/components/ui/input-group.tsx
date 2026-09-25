import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

/** An Input with a leading icon and an optional trailing slot (a clear button, a Kbd hint). */
function InputGroup({ icon, trailing, className, children }: { icon?: ReactNode; trailing?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "relative flex w-full items-center [&>[data-slot=input]]:w-full",
        icon && "[&>[data-slot=input]]:pl-8",
        trailing && "[&>[data-slot=input]]:pr-9",
        className,
      )}
    >
      {icon ? <span className="pointer-events-none absolute left-2.5 flex text-fg-tertiary [&_svg]:size-4">{icon}</span> : null}
      {children}
      {trailing ? <span className="absolute right-1.5 flex items-center">{trailing}</span> : null}
    </div>
  )
}

export type InputGroupProps = ComponentProps<typeof InputGroup>
export { InputGroup }
