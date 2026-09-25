"use client"

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
          <p className="flex h-6 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">{group.label}</p>
          <ul className="mt-minor flex flex-col">
            {group.items.map((item) => {
              const external = item.href.startsWith("http")
              const active = !external && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
              const cls = cn(
                "flex h-8 items-center justify-between rounded-sm px-2 text-ui transition-interactive duration-fast ease-out",
                active ? "bg-surface-active text-fg-strong" : "text-fg-secondary hover:bg-surface-hover hover:text-fg",
                item.status === "soon" && "text-fg-tertiary hover:bg-transparent hover:text-fg-tertiary",
              )
              const inner = (
                <>
                  <span>{item.label}</span>
                  {item.status === "soon" ? <span className="font-mono text-caption uppercase tracking-wider">soon</span> : null}
                </>
              )
              return (
                <li key={item.href}>
                  {item.status === "soon" ? (
                    <span className={cls} aria-disabled>
                      {inner}
                    </span>
                  ) : external ? (
                    <a href={item.href} className={cls} target="_blank" rel="noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <Link href={item.href} className={cls} aria-current={active ? "page" : undefined}>
                      {inner}
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
