import { Button } from "@/components/ui/button"

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-minor">
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="secondary" disabled focusableWhenDisabled>
        Still focusable
      </Button>
    </div>
  )
}
