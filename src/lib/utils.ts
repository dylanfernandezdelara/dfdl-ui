import { createCn } from "cn/config"

/**
 * `cn` with the dfdl vocabulary registered, so class merging knows which custom utilities belong to
 * which group. Without this, `cn("text-ui", "text-fg")` drops `text-ui` because a merger that has
 * never heard of a `ui` font size assumes any `text-*` it does not recognize is a color.
 *
 * Keep this list in step with `@theme` and `@utility` declarations in `src/app/globals.css`.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "title", "heading", "body", "ui", "caption"] }],
      "font-family": [{ font: ["display", "heading"] }],
      shadow: ["elevation-raised", "elevation-floating"],
      "transition-property": ["transition-interactive", "transition-icon"],
      duration: ["duration-instant", "duration-fast", "duration-normal", "duration-slow"],
      blur: [{ blur: ["icon"] }],
    },
  },
})
