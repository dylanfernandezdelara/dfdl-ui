"use client"

import { Bell, FileText, Share2, Star } from "lucide-react"

import {
  Command,
  CommandCollection,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"

type Action = { value: string; label: string; icon: typeof Bell; keys?: string[] }
type Section = { label: string; items: Action[] }

const sections: Section[] = [
  {
    label: "Bill",
    items: [
      { value: "follow", label: "Follow this bill", icon: Star, keys: ["F"] },
      { value: "alert", label: "Alert me on the next vote", icon: Bell },
      { value: "share", label: "Share", icon: Share2, keys: ["⌘", "S"] },
    ],
  },
  {
    label: "Go to",
    items: [
      { value: "text", label: "Full text", icon: FileText },
      { value: "votes", label: "Roll-call votes", icon: FileText },
    ],
  },
]

export default function CommandDemo() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg bg-raised elevation-floating">
      <Command items={sections}>
        <CommandInput placeholder="Type a command" aria-label="Command" />
        <CommandEmpty />
        <CommandList>
          {(section: Section) => (
            <CommandGroup key={section.label} items={section.items}>
              <CommandGroupLabel>{section.label}</CommandGroupLabel>
              <CommandCollection>
                {(action: Action) => (
                  <CommandItem key={action.value} value={action}>
                    <action.icon strokeWidth={1.5} aria-hidden />
                    {action.label}
                    {action.keys ? (
                      <CommandShortcut>
                        {action.keys.map((key) => (
                          <Kbd key={key}>{key}</Kbd>
                        ))}
                      </CommandShortcut>
                    ) : null}
                  </CommandItem>
                )}
              </CommandCollection>
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  )
}
