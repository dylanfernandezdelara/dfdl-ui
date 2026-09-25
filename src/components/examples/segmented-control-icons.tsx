import { LayoutGrid, List } from "lucide-react"

import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

export default function SegmentedControlIcons() {
  return (
    <SegmentedControl defaultValue="list" aria-label="View">
      <SegmentedControlItem value="list" aria-label="List">
        <List />
      </SegmentedControlItem>
      <SegmentedControlItem value="grid" aria-label="Grid">
        <LayoutGrid />
      </SegmentedControlItem>
    </SegmentedControl>
  )
}
