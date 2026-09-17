import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-separator px-major">
      <nav className="flex items-baseline gap-major text-sm">
        <Link href="/" className="font-serif text-base text-fg-strong">
          dfdl
        </Link>
        <Link href="/lab" className="text-fg-secondary hover:text-fg">
          Lab
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  )
}
