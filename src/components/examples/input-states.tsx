import { Input } from "@/components/ui/input"

export default function InputStates() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-minor">
      <Input placeholder="Disabled" aria-label="Disabled" disabled />
      <Input defaultValue="not-an-email" aria-label="Email" aria-invalid />
    </div>
  )
}
