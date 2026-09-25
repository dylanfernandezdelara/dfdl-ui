"use client"

import { useState } from "react"

import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

export default function SegmentedControlDemo() {
  const [chamber, setChamber] = useState("all")
  return (
    <SegmentedControl value={chamber} onValueChange={setChamber} aria-label="Chamber">
      <SegmentedControlItem value="all">All</SegmentedControlItem>
      <SegmentedControlItem value="house">House</SegmentedControlItem>
      <SegmentedControlItem value="senate">Senate</SegmentedControlItem>
    </SegmentedControl>
  )
}
