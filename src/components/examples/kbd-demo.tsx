import { Kbd } from "@/components/ui/kbd"

export default function KbdDemo() {
  return (
    <p className="flex items-center gap-1 text-ui text-fg-secondary">
      Press <Kbd>⌘</Kbd>
      <Kbd>K</Kbd> to search
    </p>
  )
}
