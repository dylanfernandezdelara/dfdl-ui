"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"

const pages = ["Feed", "Closest votes", "House", "Senate", "Members", "About"]

export default function CommandDialogExample() {
  const [open, setOpen] = useState(false)

  // ⌘J here, so it does not fight the docs' own ⌘K.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Jump to
        <Kbd className="ml-2">⌘J</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Jump to">
        <Command items={pages}>
          <CommandInput placeholder="Jump to a page" />
          <CommandEmpty />
          <CommandList>
            {(page: string) => (
              <CommandItem key={page} value={page} onClick={() => setOpen(false)}>
                {page}
              </CommandItem>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
