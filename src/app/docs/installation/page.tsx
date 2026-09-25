import type { Metadata } from "next"

import { CodeBlock, Command } from "@/components/docs/code"
import { DocsShell, PageTitle, type TocItem } from "@/components/docs/shell"
import { addCommand } from "@/lib/site"

export const metadata: Metadata = { title: "Installation" }

const toc: TocItem[] = [
  { id: "requirements", label: "Requirements" },
  { id: "theme", label: "Add the theme" },
  { id: "components", label: "Add components" },
  { id: "accent", label: "Pick an accent" },
]

export default function InstallationPage() {
  return (
    <DocsShell toc={toc}>
      <article className="max-w-3xl">
        <PageTitle eyebrow="Getting started" title="Installation" lede="Add dfdl to a Next.js app with Tailwind v4." />

        <Step id="requirements" n={1} title="Requirements">
          <p className="text-body text-fg-secondary">A project set up for shadcn with Tailwind v4. Starting fresh:</p>
          <Command className="mt-major">npx shadcn@latest init</Command>
        </Step>

        <Step id="theme" n={2} title="Add the theme">
          <p className="text-body text-fg-secondary">Tokens, the Tailwind mapping and the class merger.</p>
          <Command className="mt-major">{addCommand("theme")}</Command>
          <p className="mt-major text-body text-fg-secondary">
            Replace the contents of your global CSS with these imports. The theme already maps shadcn&apos;s color names, and the
            block shadcn init wrote would override it.
          </p>
          <CodeBlock
            className="mt-major"
            lang="css"
            code={`@import "tailwindcss";
@import "tw-animate-css";
@import "../styles/dfdl/tokens.css";
@import "../styles/dfdl/theme.css";`}
          />
          <p className="mt-major text-body text-fg-secondary">Headings use Lora. Load it with next/font as the --font-lora variable:</p>
          <CodeBlock
            className="mt-major"
            code={`import { Lora } from "next/font/google"

const lora = Lora({ subsets: ["latin"], variable: "--font-lora" })

<html className={lora.variable}>`}
          />
        </Step>

        <Step id="components" n={3} title="Add components">
          <p className="text-body text-fg-secondary">Each one lands in components/ui as source you own.</p>
          <Command className="mt-major">{addCommand("button")}</Command>
          <CodeBlock
            className="mt-major"
            code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Save changes</Button>
}`}
          />
        </Step>

        <Step id="accent" n={4} title="Pick an accent">
          <p className="text-body text-fg-secondary">Ember is the default. Set it once on the root; add data-quiet for data-dense tools.</p>
          <CodeBlock className="mt-major" code={`<html data-accent="indigo">`} />
        </Step>
      </article>
    </DocsShell>
  )
}

function Step({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mt-12 scroll-mt-12 pl-12 first-of-type:mt-0">
      <span className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full bg-sunken text-ui font-medium text-fg-strong">{n}</span>
      <h2 className="flex h-8 items-center text-title font-semibold text-fg-strong">{title}</h2>
      <div className="mt-minor">{children}</div>
    </section>
  )
}
