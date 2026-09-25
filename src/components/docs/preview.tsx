import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { EXAMPLES } from "@/components/examples"

import { CodeBlock } from "./code"
import { PreviewTabs } from "./preview-tabs"

/** Live example beside its source. The source is the example file itself, read at build. */
export async function ComponentPreview({ name }: { name: string }) {
  const Example = EXAMPLES[name]
  if (!Example) throw new Error(`Unknown example ${name}`)
  const source = await readFile(join(process.cwd(), "src/components/examples", `${name}.tsx`), "utf8")
  return (
    <PreviewTabs code={<CodeBlock code={source} className="rounded-none bg-transparent shadow-none" />}>
      <Example />
    </PreviewTabs>
  )
}
