import Link from "next/link"

import { EXAMPLES } from "@/components/examples"
import { COMPONENTS } from "@/content/components"

/** Every component as a card with its live demo. The demo is inert here; the card links to the page. */
export function ComponentGallery() {
  return (
    <ul className="grid gap-major sm:grid-cols-2 xl:grid-cols-3">
      {COMPONENTS.map((c) => {
        const Demo = EXAMPLES[c.demo]
        return (
          <li key={c.slug}>
            <Link href={`/components/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg bg-surface elevation-raised transition-interactive duration-fast ease-out hover:bg-surface-hover">
              <div inert data-product-type data-grid-ignore className="pointer-events-none flex h-48 items-center justify-center overflow-hidden bg-subtle p-major hairline-b">
                <div className={c.compact ? "flex w-full scale-75 justify-center" : "contents"}>
                  <Demo />
                </div>
              </div>
              <div className="p-4">
                <p className="text-ui font-medium text-fg-strong">{c.name}</p>
                <p className="mt-1 text-ui text-fg-secondary">{c.description}</p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
