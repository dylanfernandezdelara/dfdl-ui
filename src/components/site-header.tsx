import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-separator px-major">
      <nav className="flex items-baseline gap-major text-sm">
        <Link href="/" className="font-serif text-base text-strong-text">
          dfdl
        </Link>
        <Link href="/lab" className="text-secondary-text hover:text-primary-text">
          Lab
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  )
}
