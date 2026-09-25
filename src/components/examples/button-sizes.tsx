import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-minor">
      <Button size="sm" variant="secondary">Small</Button>
      <Button size="md" variant="secondary">Medium</Button>
      <Button size="lg" variant="secondary">Large</Button>
      <Button size="icon" variant="secondary" aria-label="Add">
        <Plus />
      </Button>
    </div>
  )
}
