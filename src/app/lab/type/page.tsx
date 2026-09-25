import type { Metadata } from "next"
import { Suspense } from "react"

import { DocsShell } from "@/components/docs/shell"

import "@/styles/lab/type-candidates.css"

import { TypeLab } from "./type-lab"

export const metadata: Metadata = { title: "Lab · Type, rhythm and shape" }

export default function TypeLabPage() {
  return (
    <>
      <DocsShell>
      <div className="max-w-site pb-12">
        <div className="pb-12">
          <p className="flex h-6 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">Lab 2</p>
          <h1 className="mt-minor font-display text-display text-fg-strong">Type, rhythm and shape</h1>
          <p className="mt-minor max-w-reading text-body text-fg-secondary">
            Three decisions: how hierarchy is built, where the serif is allowed, and the radius family. A on every axis is
            the approved set; the previous sites are kept as alternatives. Pick with the controls; the URL carries the selection.
          </p>
        </div>
        <Suspense fallback={null}>
          <TypeLab />
        </Suspense>
      </div>
    </DocsShell>
    </>
  )
}
