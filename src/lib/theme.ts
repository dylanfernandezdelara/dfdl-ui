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

export function subscribeTheme(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Server snapshot: unknown until hydrated. */
export function getServerTheme(): Theme | null {
  return null
}
