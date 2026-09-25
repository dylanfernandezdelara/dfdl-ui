import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>Open member</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-minor">
            <Avatar size="lg" alt="Nancy Pelosi" fallback="NP" />
            <div>
              <SheetTitle>Nancy Pelosi</SheetTitle>
              <SheetDescription>Representative, California 11th</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="flex gap-1">
          <Badge>Democrat</Badge>
          <Badge variant="accent">Sponsor of 4 bills</Badge>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
