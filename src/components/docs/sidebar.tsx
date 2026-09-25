"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { NAV } from "./nav"

export function Sidebar() {
  const pathname = usePathname()
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-major">
      {NAV.map((group) => (
        <div key={group.label}>
          <p className="flex h-8 items-center px-2 text-ui font-medium text-fg-strong">{group.label}</p>
          <ul className="flex flex-col">
            {group.items.map((item) => {
              const external = item.href.startsWith("http")
              const active = !external && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
              const cls = cn(
                "flex h-8 items-center gap-1 rounded-sm px-2 text-ui transition-interactive duration-fast ease-out",
                active ? "bg-surface-active text-fg-strong" : "text-fg-secondary hover:bg-surface-hover hover:text-fg-strong",
              )
              return (
                <li key={item.href}>
                  {external ? (
                    <a href={item.href} className={cls} target="_blank" rel="noreferrer" aria-label={`${item.label} (opens in a new tab)`}>
                      {item.label} <ArrowUpRight className="size-3.5 text-fg-tertiary" strokeWidth={1.5} aria-hidden />
                    </a>
                  ) : (
                    <Link href={item.href} className={cls} aria-current={active ? "page" : undefined}>
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
