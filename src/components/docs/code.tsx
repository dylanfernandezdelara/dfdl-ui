"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"

/** One-line command with a copy button. */
export function Command({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className={cn("flex h-10 items-center gap-minor rounded-md bg-sunken pr-1 pl-3 font-mono text-ui text-fg hairline", className)}>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <button
        type="button"
        onClick={() => {
          void navigator.clipboard.writeText(children)
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        }}
        aria-label={copied ? "Copied" : "Copy"}
        className="relative flex size-8 items-center justify-center rounded-sm text-fg-secondary transition-interactive duration-fast ease-out press hover:bg-surface-hover hover:text-fg"
      >
        <Copy className={cn("absolute size-4 transition-icon duration-normal ease-out", copied ? "scale-25 opacity-0 blur-icon" : "opacity-100")} strokeWidth={1.5} aria-hidden />
        <Check className={cn("absolute size-4 text-success transition-icon duration-normal ease-out", copied ? "opacity-100" : "scale-25 opacity-0 blur-icon")} strokeWidth={2} aria-hidden />
      </button>
    </div>
  )
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-sunken p-major font-mono text-ui text-fg hairline">
      <code>{children}</code>
    </pre>
  )
}
