import { createCssVariablesTheme, createHighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import bash from "shiki/langs/bash.mjs"
import css from "shiki/langs/css.mjs"
import tsx from "shiki/langs/tsx.mjs"

/* Colors come from --shiki-* variables mapped onto dfdl tokens in globals.css, so code follows light and dark. */
const theme = createCssVariablesTheme({ name: "dfdl", variablePrefix: "--shiki-", fontStyle: true })

const highlighter = createHighlighterCore({ themes: [theme], langs: [tsx, bash, css], engine: createJavaScriptRegexEngine() })

export type Lang = "tsx" | "bash" | "css"

/** Highlighted HTML for a code string. Runs at build time; pages that call it are static. */
export async function highlight(code: string, lang: Lang = "tsx") {
  return (await highlighter).codeToHtml(code.trimEnd(), { lang, theme: "dfdl" })
}
