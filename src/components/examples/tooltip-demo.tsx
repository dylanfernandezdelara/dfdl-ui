import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip content="Notifications">
      <Button size="icon" variant="secondary" aria-label="Notifications">
        <Bell />
      </Button>
    </Tooltip>
  )
}
