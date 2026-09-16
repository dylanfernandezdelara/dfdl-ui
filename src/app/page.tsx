import Link from "next/link"

import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-reading px-major py-12">
        <h1 className="font-serif text-2xl leading-8 text-strong-text">dfdl ui</h1>
        <p className="mt-minor text-base leading-6 text-primary-text">
          A design standard for products built by Dylan and the agents working with him. Tokens, components,
          a skill, and a lint policy, kept in one place so every project starts from the same taste.
        </p>
        <p className="mt-major text-sm leading-6 text-secondary-text">
          Under construction. The <Link href="/lab" className="text-accent-text underline decoration-accent-border underline-offset-2">lab</Link> is
          where the foundations are being decided.
        </p>
      </main>
    </>
  )
}
