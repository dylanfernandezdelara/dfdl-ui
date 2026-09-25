"use client"

import { Menu as MenuIcon } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import { Button } from "@/components/ui/button"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@/components/ui/menu"

import { NAV } from "./nav"

/** The sidebar's links, for screens too narrow to show it. */
export function MobileNav() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="ghost" size="icon" aria-label="Navigation" />}>
        <MenuIcon />
      </MenuTrigger>
      <MenuContent align="end" className="max-h-96 overflow-y-auto">
        {NAV.map((group, i) => (
          <Fragment key={group.label}>
            {i > 0 ? <MenuSeparator /> : null}
            <MenuGroup>
              <MenuLabel>{group.label}</MenuLabel>
              {group.items.map((item) =>
                item.href.startsWith("http") ? (
                  <MenuItem key={item.href} render={<a href={item.href} target="_blank" rel="noreferrer" />}>
                    {item.label}
                  </MenuItem>
                ) : (
                  <MenuItem key={item.href} render={<Link href={item.href} />}>
                    {item.label}
                  </MenuItem>
                ),
              )}
            </MenuGroup>
          </Fragment>
        ))}
      </MenuContent>
    </Menu>
  )
}
