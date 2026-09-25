import Link from "next/link"
import type { ReactNode } from "react"

import { ThemeToggle } from "@/components/theme-toggle"
import { GITHUB_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

import { MobileNav } from "./mobile-nav"
import { Sidebar } from "./sidebar"

export type TocItem = { id: string; label: string; depth?: 1 | 2 }

/**
 * Docs shell: 48px header, 240px sidebar, article column, and an "On this page" column on wide screens.
 * The chrome sets headings in sans; component previews and type specimens reset to the product default.
 */
export function DocsShell({ children, toc }: { children: ReactNode; toc?: TocItem[] }) {
  return (
    <div className="docs-chrome flex min-h-full flex-col">
      <a href="#main" className="sr-only rounded-sm bg-raised px-2 text-ui text-fg elevation-floating focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-30 focus:flex focus:h-8 focus:items-center">
        Skip to content
      </a>
      <header className="sticky top-0 z-20 bg-page/90 backdrop-blur hairline-b">
        <div className="mx-auto flex h-12 max-w-site items-center gap-major px-major">
          <Link href="/" className="flex h-8 items-center gap-1 text-body font-semibold text-fg-strong">
            dfdl<span className="font-normal text-fg-tertiary">/</span>ui
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
            <HeaderLink href="/docs/installation">Docs</HeaderLink>
            <HeaderLink href="/components">Components</HeaderLink>
            <HeaderLink href="/foundations/color">Foundations</HeaderLink>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="hidden h-8 items-center sm:flex rounded-sm px-2 text-ui text-fg-secondary transition-interactive duration-fast ease-out hover:bg-surface-hover hover:text-fg-strong"
            >
              GitHub
            </a>
            <ThemeToggle />
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-site flex-1">
        <aside className="sticky top-12 hidden h-below-header w-60 shrink-0 overflow-y-auto px-major py-major lg:block">
          <Sidebar />
        </aside>
        <main id="main" className="min-w-0 flex-1 px-major pt-12 pb-24">
          {children}
        </main>
        {toc && toc.length > 0 ? (
          <aside className="sticky top-12 hidden h-below-header w-56 shrink-0 overflow-y-auto px-major pt-12 xl:block">
            <p className="flex h-8 items-center text-ui font-medium text-fg-strong">On this page</p>
            <ul>
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={cn("flex h-8 items-center text-ui text-fg-secondary transition-interactive duration-fast ease-out hover:text-fg-strong", t.depth === 2 && "pl-3")}>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </div>
  )
}

function HeaderLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="flex h-8 items-center rounded-sm px-2 text-ui text-fg-secondary transition-interactive duration-fast ease-out hover:bg-surface-hover hover:text-fg-strong">
      {children}
    </Link>
  )
}

/** Page heading: optional small context line, title, one-line description. */
export function PageTitle({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <div className="mb-12">
      {eyebrow ? <p className="flex h-6 items-center text-ui text-fg-tertiary">{eyebrow}</p> : null}
      <h1 className="font-display text-display font-semibold text-fg-strong">{title}</h1>
      {lede ? <p className="mt-minor max-w-reading text-body text-fg-secondary">{lede}</p> : null}
    </div>
  )
}

export function Section({ id, title, lede, children }: { id?: string; title: string; lede?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-12 pb-12">
      <div className="mb-major">
        <h2 className="font-heading text-title text-fg-strong">{title}</h2>
        {lede ? <p className="mt-minor max-w-reading text-body text-fg-secondary">{lede}</p> : null}
      </div>
      {children}
    </section>
  )
}
