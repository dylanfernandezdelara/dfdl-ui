"use client"

import { Button } from "@/components/ui/button"
import { Toaster, useToast } from "@/components/ui/toast"

function CopyButton() {
  const toast = useToast()
  return (
    <Button variant="secondary" onClick={() => toast.add({ title: "Link copied" })}>
      Copy link
    </Button>
  )
}

export default function ToastPill() {
  return (
    <Toaster variant="pill" limit={1} timeout={2800}>
      <CopyButton />
    </Toaster>
  )
}
