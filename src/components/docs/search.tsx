"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { NAV } from "@/components/docs/nav"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"

type Page = { value: string; label: string }
type Section = { label: string; items: Page[] }

/** Every docs page from the nav, grouped as the sidebar groups them. External links stay in the sidebar. */
const SECTIONS: Section[] = NAV.map((group) => ({
  label: group.label,
  items: group.items.filter((item) => item.href.startsWith("/")).map((item) => ({ value: item.href, label: item.label })),
})).filter((section) => section.items.length > 0)

/** Header search: a button, and ⌘K or Ctrl+K from anywhere. */
export function DocsSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)} className="hidden sm:inline-flex">
        <Search strokeWidth={1.5} aria-hidden />
        Search
        <Kbd className="ml-2">⌘K</Kbd>
      </Button>
      <Button variant="secondary" size="icon" onClick={() => setOpen(true)} aria-label="Search" className="sm:hidden">
        <Search strokeWidth={1.5} aria-hidden />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search the docs">
        <Command items={SECTIONS}>
          <CommandInput placeholder="Search pages and components" />
          <CommandEmpty />
          <CommandList>
            {(section: Section) => (
              <CommandGroup key={section.label} items={section.items}>
                <CommandGroupLabel>{section.label}</CommandGroupLabel>
                <CommandCollection>
                  {(page: Page) => (
                    <CommandItem key={page.value} value={page} onClick={() => go(page.value)}>
                      {page.label}
                    </CommandItem>
                  )}
                </CommandCollection>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
