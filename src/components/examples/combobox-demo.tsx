"use client"

import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem } from "@/components/ui/combobox"

const members = ["Alexandria Ocasio-Cortez", "Chuck Schumer", "Hakeem Jeffries", "John Thune", "Mike Johnson", "Nancy Pelosi"]

export default function ComboboxDemo() {
  return (
    <div className="w-full max-w-xs">
      <Combobox items={members}>
        <ComboboxInput placeholder="Filter by sponsor" aria-label="Sponsor" />
        <ComboboxContent empty="No members match.">
          {(name: string) => (
            <ComboboxItem key={name} value={name}>
              {name}
            </ComboboxItem>
          )}
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
