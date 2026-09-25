import type { Metadata } from "next"

import { Code } from "@/components/docs/code"
import { DocsShell, PageTitle } from "@/components/docs/shell"
import { GUIDE } from "@/content/guide"

export const metadata: Metadata = { title: "Guide" }

export default function GuidePage() {
  return (
    <DocsShell>
      <div className="max-w-content">
        <PageTitle
          eyebrow="Start"
          title="Guide"
          lede="How to build here, for people and for agents. This is the same text served at /llms.txt. Every value comes from a recorded decision; the reasoning lives in decisions.md."
        />
        <nav aria-label="On this page" className="mb-12 flex flex-wrap gap-x-major gap-y-minor text-ui">
          {GUIDE.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="flex h-6 items-center text-fg-secondary hover:text-fg">
              {s.title}
            </a>
          ))}
        </nav>
        {GUIDE.map((s) => (
          <section key={s.id} id={s.id} className="py-12 hairline-t">
            <h2 className="font-heading text-title text-fg-strong">{s.title}</h2>
            <div className="mt-minor max-w-reading space-y-minor">
              {s.body.map((p, i) => (
                <p key={i} className="text-body text-pretty text-fg">
                  {p}
                </p>
              ))}
            </div>
            {s.code ? (
              <div className="mt-major">
                <Code>{s.code}</Code>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </DocsShell>
  )
}
