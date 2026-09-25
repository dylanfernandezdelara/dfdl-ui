import { highlight, type Lang } from "@/lib/highlight"
import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

/** Highlighted code with a copy button. Server component; highlighting happens at build. */
export async function CodeBlock({ code, lang = "tsx", className }: { code: string; lang?: Lang; className?: string }) {
  const html = await highlight(code, lang)
  return (
    <div className={cn("relative rounded-md bg-subtle hairline", className)}>
      <div className="code overflow-x-auto p-major pr-12 font-mono text-ui" dangerouslySetInnerHTML={{ __html: html }} />
      <CopyButton value={code} className="absolute top-2 right-2" />
    </div>
  )
}

/** One-line shell command. */
export async function Command({ children, className }: { children: string; className?: string }) {
  const html = await highlight(children, "bash")
  return (
    <div className={cn("flex h-11 items-center gap-minor rounded-md bg-subtle pr-2 pl-4 hairline", className)}>
      <div className="code min-w-0 flex-1 overflow-x-auto font-mono text-ui whitespace-nowrap" dangerouslySetInnerHTML={{ __html: html }} />
      <CopyButton value={children} className="size-7" />
    </div>
  )
}

/** Plain code block, kept for pages that show short snippets without highlighting needs. */
export async function Code({ children, lang = "tsx" }: { children: string; lang?: Lang }) {
  return <CodeBlock code={children} lang={lang} />
}
