/*
  dfdl design-system lint for an ESLint flat config. Installed by the `lint` registry item; dfdl-ui uses it too.

    import dfdl from "./eslint.dfdl.mjs"
    export default defineConfig([...yourConfig, ...dfdl])

  Rules and per-component contracts live in design-system.lint.json. Components under components/ui restyle their
  own parts, so the restyle rule is off there.
*/
import { plugin as shadcn } from "@shadcn/lint"

import policy from "./design-system.lint.json" with { type: "json" }

const dfdl = [{ files: ["**/*.{js,jsx,ts,tsx}"], plugins: { shadcn }, rules: policy.rules }, ...policy.overrides]

export default dfdl
