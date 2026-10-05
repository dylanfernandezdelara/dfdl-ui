import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

import dfdl from "./eslint.dfdl.mjs"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...dfdl,
  // The labs show rejected alternatives next to the approved values.
  { files: ["src/app/lab/**"], rules: { "shadcn/no-restyle": "off" } },
  globalIgnores([".next/**", ".open-next/**", "out/**", "build/**", "next-env.d.ts", "public/r/**", ".agents/**"]),
])

export default eslintConfig
