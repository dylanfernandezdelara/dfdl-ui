import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>
        <SlidersHorizontal /> Filters
      </PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Show</PopoverTitle>
        <PopoverDescription>Applies to the feed.</PopoverDescription>
        <div className="mt-minor flex flex-col gap-minor">
          <label className="flex items-center justify-between text-ui text-fg">
            Passed a chamber <Switch defaultChecked />
          </label>
          <label className="flex items-center justify-between text-ui text-fg">
            Signed into law <Switch />
          </label>
        </div>
      </PopoverContent>
    </Popover>
  )
}
