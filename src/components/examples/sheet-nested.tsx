import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function SheetNested() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>Open bill</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>H.R. 4821</SheetTitle>
          <SheetDescription>Passed the House 218 to 210.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Sheet>
            <SheetTrigger render={<Button variant="secondary" />}>Sponsor</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Nancy Pelosi</SheetTitle>
                <SheetDescription>Opened on top; the bill steps back behind it.</SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <SheetClose render={<Button variant="ghost" />}>Back</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
