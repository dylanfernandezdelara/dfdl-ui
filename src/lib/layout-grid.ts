/** One minor and one major rhythm. Keep in sync with --space-minor / --space-major in tokens.css. */
export const LAYOUT_GRID_MINOR_PX = 8
export const LAYOUT_GRID_MAJOR_PX = 24
export const LAYOUT_GRID_LINE_WIDTH_PX = 1

export const LAYOUT_GRID_QUERY_PARAM = "grid"
export const LAYOUT_GRID_STORAGE_KEY = "dfdl-layout-grid"
export const LAYOUT_GRID_HOTKEY = "g"

const listeners = new Set<() => void>()
let initialized = false

function emit() {
  for (const l of listeners) l()
}

export function parseLayoutGridQuery(search: string): boolean | null {
  const value = new URLSearchParams(search).get(LAYOUT_GRID_QUERY_PARAM)
  if (value === null) return null
  return !(value === "0" || value === "false" || value === "off")
}

export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
}

export function isLayoutGridHotkey(event: KeyboardEvent): boolean {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return false
  if (event.key.toLowerCase() !== LAYOUT_GRID_HOTKEY) return false
  return !isTypingTarget(event.target)
}

/** Reads enabled state; on first read, a `?grid=` query wins and is persisted. */
export function readLayoutGrid(): boolean {
  if (!initialized) {
    initialized = true
    const fromQuery = parseLayoutGridQuery(window.location.search)
    if (fromQuery !== null) window.sessionStorage.setItem(LAYOUT_GRID_STORAGE_KEY, fromQuery ? "on" : "off")
  }
  return window.sessionStorage.getItem(LAYOUT_GRID_STORAGE_KEY) === "on"
}

export function getServerLayoutGrid(): boolean {
  return false
}

export function setLayoutGrid(enabled: boolean) {
  window.sessionStorage.setItem(LAYOUT_GRID_STORAGE_KEY, enabled ? "on" : "off")
  emit()
}

export function toggleLayoutGrid() {
  setLayoutGrid(!readLayoutGrid())
}

export function subscribeLayoutGrid(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
