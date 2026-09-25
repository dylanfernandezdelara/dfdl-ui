import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CodeBlock, Command } from "@/components/docs/code"
import { ComponentPreview } from "@/components/docs/preview"
import { PropsTable } from "@/components/docs/props-table"
import { DocsShell, PageTitle, type TocItem } from "@/components/docs/shell"
import { componentBySlug, COMPONENTS } from "@/content/components"
import { addCommand } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps<"/components/[slug]">): Promise<Metadata> {
  const doc = componentBySlug((await params).slug)
  return doc ? { title: doc.name, description: doc.description } : {}
}

export default async function ComponentPage({ params }: PageProps<"/components/[slug]">) {
  const doc = componentBySlug((await params).slug)
  if (!doc) notFound()
  const toc: TocItem[] = [
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    ...(doc.examples.length ? [{ id: "examples", label: "Examples" }, ...doc.examples.map((e) => ({ id: e.name, label: e.title, depth: 2 as const }))] : []),
    ...(doc.motion ? [{ id: "motion", label: "Motion" }] : []),
    { id: "api", label: "API" },
  ]
  return (
    <DocsShell toc={toc}>
      <article className="max-w-3xl">
        <PageTitle eyebrow="Components" title={doc.name} lede={doc.description} />
        {doc.base ? (
          <a
            href={doc.base.href}
            target="_blank"
            rel="noreferrer"
            className="-mt-major mb-major inline-flex h-7 items-center gap-1 rounded-full bg-subtle px-2.5 text-caption text-fg-secondary hairline transition-interactive duration-fast ease-out hover:text-fg-strong"
          >
            Built on Base UI {doc.base.name} <ArrowUpRight className="size-3" strokeWidth={1.5} aria-hidden />
          </a>
        ) : null}
        <ComponentPreview name={doc.demo} />

        <DocSection id="installation" title="Installation">
          <Command>{addCommand(doc.slug)}</Command>
        </DocSection>

        <DocSection id="usage" title="Usage">
          <CodeBlock code={doc.usage} />
        </DocSection>

        {doc.examples.length ? (
          <DocSection id="examples" title="Examples">
            <div className="flex flex-col gap-12">
              {doc.examples.map((e) => (
                <div key={e.name} id={e.name} className="scroll-mt-12">
                  <h3 className="text-heading text-fg-strong">{e.title}</h3>
                  {e.description ? <p className="mt-1 text-ui text-fg-secondary">{e.description}</p> : null}
                  <div className="mt-major">
                    <ComponentPreview name={e.name} />
                  </div>
                </div>
              ))}
            </div>
          </DocSection>
        ) : null}

        {doc.motion ? (
          <DocSection id="motion" title="Motion">
            <p className="max-w-reading text-body text-fg-secondary">{doc.motion}</p>
          </DocSection>
        ) : null}

        <DocSection id="api" title="API">
          <PropsTable props={doc.props} />
        </DocSection>
      </article>
    </DocsShell>
  )
}

function DocSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-12">
      <h2 className="mb-major text-title text-fg-strong">{title}</h2>
      {children}
    </section>
  )
}
