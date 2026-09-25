import type { Metadata } from "next"
import { Suspense } from "react"

import { DocsShell } from "@/components/docs/shell"

import "@/styles/lab/candidates.css"

import { ColorLab } from "./color-lab"

export const metadata: Metadata = { title: "Lab · Color and surfaces" }

export default function ColorLabPage() {
  return (
    <>
      <DocsShell>
      <div className="max-w-site pb-12">
        <div className="pb-12">
          <p className="flex h-6 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">Lab 1</p>
          <h1 className="mt-minor font-display text-display text-fg-strong">Color and surfaces</h1>
          <p className="mt-minor max-w-reading text-body text-fg-secondary">
            Three decisions: neutral temperature, accent hue, depth recipe. Each axis has the approved values as A and two
            computed alternatives. Pick with the controls; the URL carries the selection so it can be shared. Contrast
            ratios are measured, not estimated; red means below 4.5:1 for text or 3:1 for tertiary.
          </p>
        </div>
        <Suspense fallback={null}>
          <ColorLab />
        </Suspense>
      </div>
    </DocsShell>
    </>
  )
}
