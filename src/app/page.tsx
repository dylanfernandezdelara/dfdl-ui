import Link from "next/link"

import { Command } from "@/components/docs/code"
import { ComponentGallery } from "@/components/docs/gallery"
import { DocsShell, Section } from "@/components/docs/shell"
import { Button } from "@/components/ui/button"
import { addCommand } from "@/lib/site"

const foundations: [string, string, string][] = [
  ["Color", "One warm neutral and one accent per product.", "/foundations/color"],
  ["Typography", "System sans body, Lora headings, hierarchy from weight.", "/foundations/type"],
  ["Shape and spacing", "An 8px grid and one round radius family.", "/foundations/shape"],
  ["Motion", "Strong ease-out, 100 to 500ms, exits a quarter shorter.", "/foundations/motion"],
]

export default function HomePage() {
  return (
    <DocsShell>
      <div className="pb-12">
        <h1 className="font-display text-display font-semibold text-fg-strong">dfdl ui</h1>
        <p className="mt-minor max-w-reading text-body text-fg-secondary">
          Tokens and React components for Dylan&apos;s products. Built on Base UI, styled with Tailwind, installed with the shadcn CLI.
        </p>
        <div className="mt-major flex flex-wrap gap-minor">
          <Button nativeButton={false} render={<Link href="/docs/installation" />}>
            Get started
          </Button>
          <Button variant="secondary" nativeButton={false} render={<Link href="/components" />}>
            Browse components
          </Button>
        </div>
        <Command className="mt-major max-w-2xl">{addCommand("theme")}</Command>
      </div>

      <Section id="components" title="Components">
        <ComponentGallery />
      </Section>

      <Section id="foundations" title="Foundations">
        <ul className="grid gap-major sm:grid-cols-2 xl:grid-cols-4">
          {foundations.map(([title, description, href]) => (
            <li key={href}>
              <Link href={href} className="flex h-full flex-col rounded-lg bg-surface p-4 elevation-raised transition-interactive duration-fast ease-out hover:bg-surface-hover">
                <span className="text-ui font-medium text-fg-strong">{title}</span>
                <span className="mt-1 text-ui text-fg-secondary">{description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </DocsShell>
  )
}
