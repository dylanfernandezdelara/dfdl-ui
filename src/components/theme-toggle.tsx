"use client"

import { Moon, Sun } from "lucide-react"
import { useCallback, useSyncExternalStore } from "react"

import { applyTheme, getServerTheme, readTheme, subscribeTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, getServerTheme)

  const toggle = useCallback(() => {
    applyTheme(readTheme() === "dark" ? "light" : "dark")
  }, [])

  const isDark = theme === "dark"
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === null ? "Toggle theme" : isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative flex size-8 items-center justify-center rounded-md border border-border-default bg-surface text-secondary-text shadow-raised",
        "transition-interactive duration-fast ease-out press",
        "hover:bg-surface-hover hover:text-primary-text",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        className,
      )}
    >
      {/* Both icons stay in the DOM and cross-fade with opacity, scale and blur. */}
      <Sun
        className={cn(
          "absolute size-4 transition-icon duration-normal ease-out",
          isDark ? "scale-25 opacity-0 blur-icon" : "scale-100 opacity-100 blur-none",
        )}
        strokeWidth={1.5}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute size-4 transition-icon duration-normal ease-out",
          isDark ? "scale-100 opacity-100 blur-none" : "scale-25 opacity-0 blur-icon",
        )}
        strokeWidth={1.5}
        aria-hidden
      />
    </button>
  )
}
