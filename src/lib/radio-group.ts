import type { KeyboardEvent } from "react"

/**
 * Keyboard behavior for a `role="radiogroup"` of buttons: arrows and Home/End move the selection and focus with it.
 * Pair with `tabIndex={checked ? 0 : -1}` on each radio so the group is a single Tab stop.
 */
export function radioGroupKeys<T>(values: readonly T[], value: T, onChange: (v: T) => void) {
  return (e: KeyboardEvent<HTMLElement>) => {
    const i = values.indexOf(value)
    const last = values.length - 1
    const prev = i <= 0 ? last : i - 1
    const next = i === last ? 0 : i + 1
    const to = ({ ArrowRight: next, ArrowDown: next, ArrowLeft: prev, ArrowUp: prev, Home: 0, End: last } as Record<string, number>)[e.key]
    if (to === undefined) return
    e.preventDefault()
    onChange(values[to])
    e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')[to]?.focus()
  }
}
