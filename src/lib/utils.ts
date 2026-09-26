import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * `cn` with the dfdl vocabulary registered, so class merging knows which custom utilities belong to
 * which group. Without this, `cn("text-ui", "text-fg")` drops `text-ui` because a merger that has
 * never heard of a `ui` font size assumes any `text-*` it does not recognize is a color.
 *
 * Keep this list in step with `@theme` and `@utility` declarations in `src/styles/theme.css`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["headline", "display", "title", "heading", "body", "reading", "ui", "caption"] }],
      "font-family": [{ font: ["display", "heading"] }],
      shadow: ["elevation-raised", "elevation-floating", "hairline", "hairline-t", "hairline-b", "hairline-r", "hairline-l", "hairline-b-strong"],
      h: ["h-below-header"],
      w: ["w-anchor"],
      transition: [
        "transition-interactive",
        "transition-icon",
        "motion-pop",
        "motion-tooltip",
        "motion-dialog",
        "motion-fade",
        "motion-reveal",
        "sheet-popup",
        "sheet-backdrop",
        "toast-root",
        "toast-content",
      ],
      duration: ["duration-instant", "duration-fast", "duration-normal", "duration-slow", "duration-slower"],
      ease: [{ ease: ["spring", "drawer"] }],
      blur: [{ blur: ["icon"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
