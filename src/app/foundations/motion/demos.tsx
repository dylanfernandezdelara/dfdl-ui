"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

import { DialogSpec, DrawerSpec, PopoverSpec, PressRow, SwitchSpec, TabsSpec, ToastSpec, TooltipSpec } from "@/app/lab/motion/specimens"

import "@/styles/lab/motion-candidates.css"

/** The motion lab's specimens on the approved tokens, with a speed control. */
export function MotionDemos() {
  const [speed, setSpeed] = useState<"normal" | "quarter" | "slow">("normal")
  return (
    <div data-speed={speed}>
      <div className="mb-major flex items-center gap-minor">
        <span className="w-16 font-mono text-caption uppercase tracking-wider text-fg-tertiary">Speed</span>
        <div role="radiogroup" aria-label="Speed" className="flex h-8 rounded-md bg-sunken p-1 hairline">
          {(["normal", "quarter", "slow"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={speed === v}
              onClick={() => setSpeed(v)}
              className={cn(
                "h-6 rounded-sm px-2 text-caption transition-interactive duration-fast ease-out press",
                speed === v ? "bg-surface text-fg-strong elevation-raised" : "text-fg-secondary hover:text-fg",
              )}
            >
              {v === "normal" ? "1×" : v === "quarter" ? "¼×" : "⅒×"}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-page p-major hairline">
        <PressRow />
        <div className="mt-major flex flex-wrap items-start gap-major">
          <PopoverSpec />
          <TooltipSpec />
          <SwitchSpec />
        </div>
        <div className="mt-major">
          <TabsSpec />
        </div>
        <div className="mt-major">
          <DialogSpec />
        </div>
        <div className="mt-major flex flex-wrap items-start gap-major">
          <div className="min-w-0 flex-1">
            <ToastSpec />
          </div>
          <DrawerSpec />
        </div>
      </div>
    </div>
  )
}
