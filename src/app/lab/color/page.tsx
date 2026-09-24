import type { Metadata } from "next"
import { Suspense } from "react"

import { SiteHeader } from "@/components/site-header"

import "@/styles/lab/candidates.css"

import { ColorLab } from "./color-lab"

export const metadata: Metadata = { title: "Lab · Color and surfaces" }

export default function ColorLabPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-content px-major pb-12">
        <div className="py-12">
          <p className="font-mono text-xs uppercase tracking-wider text-fg-tertiary">Lab 1</p>
          <h1 className="mt-1 font-serif text-2xl leading-8 text-fg-strong">Color and surfaces</h1>
          <p className="mt-minor max-w-reading text-base leading-6 text-fg-secondary">
            Three decisions: neutral temperature, accent hue, depth recipe. Each axis has the current values as A and two
            computed alternatives. Pick with the controls; the URL carries the selection so it can be shared. Contrast
            ratios are measured, not estimated; red means below 4.5:1 for text or 3:1 for tertiary.
          </p>
        </div>
        <Suspense fallback={null}>
          <ColorLab />
        </Suspense>
      </main>
    </>
  )
}
