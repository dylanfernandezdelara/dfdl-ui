"use client"

import { useState } from "react"

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

export default function CollapsibleExpand() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full max-w-md">
      <div className="flex h-control items-center gap-major">
        <SegmentedControl variant="underline" aria-label="Chamber" defaultValue="all">
          <SegmentedControlItem value="all">All</SegmentedControlItem>
          <SegmentedControlItem value="house">House</SegmentedControlItem>
          <SegmentedControlItem value="senate">Senate</SegmentedControlItem>
        </SegmentedControl>
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="h-control text-ui text-fg-secondary transition-interactive duration-fast ease-out hover:text-fg-strong">
          Filters
        </button>
      </div>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleContent expand>
          <div className="grid grid-cols-2 gap-major pt-major">
            <Input variant="underline" placeholder="State" aria-label="State" />
            <Input variant="underline" placeholder="Member" aria-label="Member" />
          </div>
        </CollapsibleContent>
      </Collapsible>
      <p className="mt-major text-body text-fg-secondary">The feed below moves down with the panel instead of jumping.</p>
    </div>
  )
}
