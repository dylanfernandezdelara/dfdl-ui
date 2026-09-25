import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonWithIcon() {
  return (
    <Button variant="secondary">
      <Download /> Export
    </Button>
  )
}
