import type { Metadata } from "next"
import { Suspense } from "react"

import { SiteHeader } from "@/components/site-header"

import "@/styles/lab/type-candidates.css"

import { TypeLab } from "./type-lab"

export const metadata: Metadata = { title: "Lab · Type, rhythm and shape" }

export default function TypeLabPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-content px-major pb-12">
        <div className="py-12">
          <p className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">Lab 2</p>
          <h1 className="mt-1 font-display text-display text-fg-strong">Type, rhythm and shape</h1>
          <p className="mt-minor max-w-reading text-body text-fg-secondary">
            Three decisions: how hierarchy is built, where the serif is allowed, and the radius family. A on every axis is
            the current sites. Pick with the controls; the URL carries the selection.
          </p>
        </div>
        <Suspense fallback={null}>
          <TypeLab />
        </Suspense>
      </main>
    </>
  )
}
