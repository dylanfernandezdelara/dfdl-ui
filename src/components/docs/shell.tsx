import Link from "next/link"
import type { ReactNode } from "react"

import { ThemeToggle } from "@/components/theme-toggle"

import { Sidebar } from "./sidebar"

/**
 * Docs shell: 48px header, 240px sidebar, content column. Every dimension is a multiple of 8.
 */
export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <a href="#main" className="sr-only rounded-sm bg-raised px-2 text-ui text-fg elevation-floating focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-30 focus:flex focus:h-8 focus:items-center">
        Skip to content
      </a>
      <header className="sticky top-0 z-20 flex h-12 items-center justify-between bg-page/90 px-major backdrop-blur hairline-b">
        <div className="flex items-center gap-major">
          <Link href="/" className="flex h-6 items-center gap-2 font-display text-heading text-fg-strong">
            dfdl <span className="font-sans text-ui font-normal text-fg-secondary">ui</span>
          </Link>
          <span className="hidden font-mono text-caption text-fg-tertiary sm:block">Dylan&apos;s design standard, for people and agents</span>
        </div>
        <div className="flex items-center gap-minor">
          <a href="https://github.com/dylanfernandezdelara/dfdl-ui" target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)" className="flex h-8 items-center rounded-sm px-2 text-ui text-fg-secondary hover:bg-surface-hover hover:text-fg transition-interactive duration-fast ease-out">
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-site flex-1">
        <aside className="sticky top-12 hidden h-below-header w-60 shrink-0 overflow-y-auto px-major py-major hairline-r lg:block">
          <Sidebar />
        </aside>
        <main id="main" className="min-w-0 flex-1 px-major py-major">{children}</main>
      </div>
    </div>
  )
}

export function PageTitle({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <div className="mb-12">
      <p className="flex h-6 items-center font-mono text-caption uppercase tracking-wider text-fg-tertiary">{eyebrow}</p>
      <h1 className="mt-minor font-display text-display text-fg-strong">{title}</h1>
      <p className="mt-minor max-w-reading text-body text-fg-secondary">{lede}</p>
    </div>
  )
}

export function Section({ id, title, lede, children }: { id?: string; title: string; lede?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-12 py-12 hairline-t">
      <div className="mb-major">
        <h2 className="font-heading text-title text-fg-strong">{title}</h2>
        {lede ? <p className="mt-minor max-w-reading text-ui text-fg-secondary">{lede}</p> : null}
      </div>
      {children}
    </section>
  )
}
