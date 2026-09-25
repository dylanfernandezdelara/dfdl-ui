import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuShortcut, MenuTrigger } from "@/components/ui/menu"

export default function MenuGroups() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        Sort <ChevronDown />
      </MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel>Date</MenuLabel>
          <MenuItem>
            Newest first <MenuShortcut>N</MenuShortcut>
          </MenuItem>
          <MenuItem>Oldest first</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuLabel>Activity</MenuLabel>
          <MenuItem>Most votes</MenuItem>
          <MenuItem disabled>Most amendments</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}
