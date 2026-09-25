import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-xs text-ui">
      <div className="flex h-8 items-center justify-between">
        <span className="text-fg-secondary">Introduced</span>
        <span className="text-fg tabular-nums">1,284</span>
      </div>
      <Separator />
      <div className="flex h-8 items-center justify-between">
        <span className="text-fg-secondary">Passed House</span>
        <span className="text-fg tabular-nums">212</span>
      </div>
      <Separator />
      <div className="flex h-8 items-center gap-minor text-fg-secondary">
        House <Separator orientation="vertical" /> Senate
      </div>
    </div>
  )
}
