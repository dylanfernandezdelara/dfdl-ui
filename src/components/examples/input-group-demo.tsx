import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { InputGroup } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export default function InputGroupDemo() {
  return (
    <InputGroup icon={<Search />} trailing={<Kbd>/</Kbd>} className="max-w-xs">
      <Input placeholder="Search bills" aria-label="Search bills" />
    </InputGroup>
  )
}
