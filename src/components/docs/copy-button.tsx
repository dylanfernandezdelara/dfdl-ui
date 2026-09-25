"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value).then(
          () => {
            setCopied(true)
            clearTimeout(timer.current)
            timer.current = setTimeout(() => setCopied(false), 1200)
          },
          () => {},
        )
      }}
      aria-label={copied ? "Copied" : "Copy"}
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-sm text-fg-tertiary transition-interactive duration-fast ease-out press hover:bg-surface-hover hover:text-fg-strong",
        className,
      )}
    >
      <Copy className={cn("absolute size-4 transition-icon duration-normal ease-out", copied ? "scale-25 opacity-0 blur-icon" : "opacity-100")} strokeWidth={1.5} aria-hidden />
      <Check className={cn("absolute size-4 text-success transition-icon duration-normal ease-out", copied ? "opacity-100" : "scale-25 opacity-0 blur-icon")} strokeWidth={2} aria-hidden />
    </button>
  )
}
