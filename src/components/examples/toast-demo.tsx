"use client"

import { Button } from "@/components/ui/button"
import { Toaster, useToast } from "@/components/ui/toast"

function SaveButton() {
  const toast = useToast()
  return (
    <Button variant="secondary" onClick={() => toast.add({ title: "Saved to your list", description: "H.R. 4821 will show up in Following." })}>
      Follow bill
    </Button>
  )
}

export default function ToastDemo() {
  return (
    <Toaster>
      <SaveButton />
    </Toaster>
  )
}
