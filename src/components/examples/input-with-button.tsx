import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InputWithButton() {
  return (
    <form className="flex w-full max-w-sm gap-minor">
      <Input type="email" placeholder="you@example.com" aria-label="Email" />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}
