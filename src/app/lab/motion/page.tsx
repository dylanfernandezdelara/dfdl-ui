import type { Metadata } from "next"
import { Suspense } from "react"

import { DocsShell } from "@/components/docs/shell"

import "@/styles/lab/motion-candidates.css"

import { MotionLab } from "./motion-lab"

export const metadata: Metadata = { title: "Lab · Motion" }

export default function MotionLabPage() {
  return (
    <>
      <DocsShell>
      <div data-product-type className="max-w-site pb-12">
        <div className="pb-12">
          <p className="flex h-6 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">Lab 3</p>
          <h1 className="mt-minor font-display text-display text-fg-strong">Motion</h1>
          <p className="mt-minor max-w-reading text-body text-fg-secondary">
            Three decisions: the curve, how exits relate to enters, and press feedback. A is the approved set; Fork&apos;s previous motion is B. Durations follow
            frequency and are not up for debate here: 100ms tooltips, 150ms press and hover, 200ms menus, 300ms dialogs,
            500ms drawers. Everything on this page is a real transition; nothing is a video.
          </p>
        </div>
        <Suspense fallback={null}>
          <MotionLab />
        </Suspense>
      </div>
    </DocsShell>
    </>
  )
}
