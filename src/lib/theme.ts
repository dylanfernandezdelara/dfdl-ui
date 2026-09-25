export type Theme = "light" | "dark"

const STORAGE_KEY = "theme"
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

export function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

/** Swaps theme with transitions suppressed for one frame so the page snaps instead of smearing. */
export function applyTheme(theme: Theme) {
  const style = document.createElement("style")
  // Everything snaps except the control that triggered the switch, whose icon swap is the feedback.
  style.textContent =
    ":where(*:not([data-theme-toggle],[data-theme-toggle] *)),:where(*:not([data-theme-toggle] *))::before,:where(*:not([data-theme-toggle] *))::after{transition:none !important}"
  document.head.appendChild(style)
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.classList.toggle("light", theme === "light")
  window.localStorage.setItem(STORAGE_KEY, theme)
  void document.documentElement.offsetHeight
  requestAnimationFrame(() => style.remove())
  emit()
}

/* With no stored choice the page follows the system, including when it changes while the page is open. */
function onSystemChange(e: MediaQueryListEvent) {
  if (window.localStorage.getItem(STORAGE_KEY)) return
  document.documentElement.classList.toggle("dark", e.matches)
  document.documentElement.classList.toggle("light", !e.matches)
  emit()
}

export function subscribeTheme(listener: () => void) {
  const system = window.matchMedia("(prefers-color-scheme: dark)")
  if (listeners.size === 0) system.addEventListener("change", onSystemChange)
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) system.removeEventListener("change", onSystemChange)
  }
}

/** Server snapshot: unknown until hydrated. */
export function getServerTheme(): Theme | null {
  return null
}
