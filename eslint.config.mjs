import { plugin as shadcn } from "@shadcn/lint"
import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

import policy from "./design-system.lint.json" with { type: "json" }

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { shadcn },
    settings: {
      shadcn: {
        // Theme and components are discovered from components.json.
        note: "Design rules and the reason behind every token live in skills/dfdl-ui/SKILL.md and decisions.md.",
      },
    },
    rules: policy.rules,
  },
  ...policy.overrides,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "public/r/**", ".agents/**"]),
])

export default eslintConfig
