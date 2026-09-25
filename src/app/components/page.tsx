import type { Metadata } from "next"

import { ComponentGallery } from "@/components/docs/gallery"
import { DocsShell, PageTitle } from "@/components/docs/shell"

export const metadata: Metadata = { title: "Components" }

export default function ComponentsPage() {
  return (
    <DocsShell>
      <PageTitle title="Components" lede="Built on Base UI, styled with dfdl tokens, installed with the shadcn CLI." />
      <ComponentGallery />
    </DocsShell>
  )
}
