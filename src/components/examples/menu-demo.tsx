import { ChevronDown, GitFork, Pencil, RotateCw, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuShortcut, MenuTrigger } from "@/components/ui/menu"

export default function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        Options <ChevronDown />
      </MenuTrigger>
      <MenuContent>
        <MenuItem>
          <Pencil /> Rename <MenuShortcut>R</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <GitFork /> Fork
        </MenuItem>
        <MenuItem>
          <RotateCw /> Regenerate
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="danger">
          <Trash2 /> Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
