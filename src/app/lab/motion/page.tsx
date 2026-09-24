import type { Metadata } from "next"
import { Suspense } from "react"

import { SiteHeader } from "@/components/site-header"

import "@/styles/lab/motion-candidates.css"

import { MotionLab } from "./motion-lab"

export const metadata: Metadata = { title: "Lab · Motion" }

export default function MotionLabPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-content px-major pb-12">
        <div className="py-12">
          <p className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">Lab 3</p>
          <h1 className="mt-1 font-display text-display text-fg-strong">Motion</h1>
          <p className="mt-minor max-w-reading text-body text-fg-secondary">
            Three decisions: the curve, how exits relate to enters, and press feedback. A is Fork today. Durations follow
            frequency and are not up for debate here: 100ms tooltips, 150ms press and hover, 200ms menus, 300ms dialogs,
            500ms drawers. Everything on this page is a real transition; nothing is a video.
          </p>
        </div>
        <Suspense fallback={null}>
          <MotionLab />
        </Suspense>
      </main>
    </>
  )
}
