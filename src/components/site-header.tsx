import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="flex h-12 items-center justify-between px-major hairline-b">
      <nav className="flex items-center gap-major text-ui">
        <Link href="/" className="flex h-6 items-center font-display text-heading text-fg-strong">
          dfdl
        </Link>
        <Link href="/lab" className="flex h-6 items-center text-fg-secondary hover:text-fg">
          Lab
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  )
}
