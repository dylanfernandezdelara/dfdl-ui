import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-minor">
      <Badge>Draft</Badge>
      <Badge variant="accent">New</Badge>
      <Badge variant="success">Passed</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Failed</Badge>
    </div>
  )
}
