import type { Metadata } from "next"

import { Code } from "@/components/docs/code"
import { DocsShell, PageTitle, Section } from "@/components/docs/shell"
import { Ramp, RoleSwatch } from "@/components/docs/swatches"
import tokens from "@/generated/tokens.json"

import { DataRow, FloatingCard, GhostButton, NeutralButton, Paragraph, RaisedCard, SelectableList, SolidButton, StatusBadges, TextInput, TintedButton } from "@/app/lab/color/specimens"

export const metadata: Metadata = { title: "Color" }

const semantic: [string, string, string][] = [
  ["bg-page", "bg-page", "The page. Never pure white or black."],
  ["bg-subtle", "bg-subtle", "Sidebars, secondary regions."],
  ["bg-surface", "bg-surface", "Cards and rows at rest."],
  ["bg-surface-hover", "bg-surface-hover", "Hover. Opaque, so it reads the same on any surface."],
  ["bg-surface-active", "bg-surface-active", "Pressed, selected segment."],
  ["bg-sunken", "bg-sunken", "Inset areas: code, wells, segmented control track."],
  ["bg-raised", "bg-raised", "Popovers, menus, dialogs."],
  ["fg", "bg-fg", "Body text. Soft, not ink."],
  ["fg-secondary", "bg-fg-secondary", "Supporting text, metadata."],
  ["fg-tertiary", "bg-fg-tertiary", "Placeholders, timestamps, disabled-adjacent."],
  ["fg-strong", "bg-fg-strong", "Headings and emphasis. The ink."],
  ["border-line", "bg-line", "Default 1px line."],
  ["border-line-subtle", "bg-line-subtle", "Inside cards."],
  ["border-separator", "bg-separator", "Between rows. Prefer hairline-* utilities."],
  ["accent-bg", "bg-accent-bg", "Tinted fill behind selected rows and chips."],
  ["accent-solid", "bg-accent-solid", "The primary action."],
  ["accent-text", "bg-accent-text", "Links and accent text on the page."],
  ["focus", "bg-focus", "Focus ring. Always visible, always the accent."],
]

function InContext({ dark }: { dark: boolean }) {
  return (
    <div className={dark ? "dark rounded-lg bg-page p-major text-fg hairline" : "rounded-lg bg-page p-major text-fg hairline"}>
      <p className="flex h-6 items-center text-ui text-fg-tertiary">{dark ? "Dark" : "Light"}</p>
      <div className="mt-major flex flex-wrap items-center gap-minor">
        <SolidButton>Save changes</SolidButton>
        <TintedButton>Fork</TintedButton>
        <NeutralButton>Cancel</NeutralButton>
        <GhostButton>Learn more</GhostButton>
      </div>
      <div className="mt-major">
        <Paragraph />
      </div>
      <div className="mt-major">
        <StatusBadges />
      </div>
      <div className="mt-major grid gap-major sm:grid-cols-2">
        <TextInput />
        <TextInput focused />
      </div>
      <div className="mt-major flex flex-wrap items-start gap-major">
        <SelectableList />
        <FloatingCard />
        <RaisedCard />
      </div>
      <div className="mt-major">
        <DataRow />
      </div>
    </div>
  )
}

export default function ColorPage() {
  const L = tokens.light
  const D = tokens.dark
  return (
    <DocsShell>
      <div className="max-w-content">
        <PageTitle
          eyebrow="Foundations"
          title="Color"
          lede="One warm neutral, one accent per product, three status hues. OKLCH, generated, contrast measured."
        />

        <Section title="Neutral" lede="Twelve steps. Text sits outside the ramp: body at 37% lightness, headings at 12%.">
          <Ramp steps={L.neutral} name="neutral · light" />
          <Ramp steps={D.neutral} name="neutral · dark" className="mt-major" />
          <div className="mt-major grid gap-major sm:grid-cols-2">
            {(["light", "dark"] as const).map((a) => (
              <div key={a} className={a === "dark" ? "dark rounded-lg bg-page p-major hairline" : "rounded-lg bg-page p-major hairline"}>
                <p className="flex h-6 items-center text-ui text-fg-tertiary">text on page · {a}</p>
                <ul className="mt-minor">
                  {Object.entries(tokens[a].text).map(([k, v]) => (
                    <li key={k} className="flex h-8 items-center justify-between gap-major">
                      <span className={k === "fg" ? "text-body text-fg" : k === "fg-secondary" ? "text-body text-fg-secondary" : k === "fg-tertiary" ? "text-body text-fg-tertiary" : "text-body text-fg-strong"}>{k}</span>
                      <span className="font-mono text-caption tabular-nums text-fg-tertiary">{v.oklch} · {v.onPage.toFixed(1)}:1</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Accents" lede="Ember by default, indigo for products that already own blue. Same lightness, interchangeable.">
          {Object.entries(L.accents).map(([name, a]) => (
            <div key={name} className="mb-major">
              <Ramp steps={a.ramp} name={`${name} · light · hue ${a.hue} · on solid ${a.onSolid.toFixed(1)}:1`} roles={false} />
              <Ramp steps={D.accents[name as keyof typeof D.accents].ramp} name={`${name} · dark · on solid ${D.accents[name as keyof typeof D.accents].onSolid.toFixed(1)}:1`} roles={false} className="mt-minor" />
            </div>
          ))}
          <Code>{`<html data-accent="ember">   <!-- default -->\n<html data-accent="indigo">  <!-- a product that already owns blue -->\n<html data-quiet>            <!-- data-dense product: sans headings, no accent -->`}</Code>
        </Section>

        <Section title="Status" lede="Each hue is at least 30 degrees from both accents.">
          <div className="grid gap-major lg:grid-cols-3">
            {Object.entries(L.status).map(([k, s]) => (
              <Ramp key={k} steps={s.ramp} name={`${k} · hue ${s.hue}`} roles={false} />
            ))}
          </div>
        </Section>

        <Section title="Semantic roles" lede="The only colors components use. Each swatch is the live token.">
          <div className="grid gap-minor sm:grid-cols-2 lg:grid-cols-3">
            {semantic.map(([name, cls, note]) => (
              <RoleSwatch key={name} name={name} className={cls} note={note} />
            ))}
          </div>
        </Section>

        <Section title="In context" lede="Light and dark side by side.">
          <div data-product-type className="grid gap-major xl:grid-cols-2">
            <InContext dark={false} />
            <InContext dark />
          </div>
        </Section>

        <Section title="Depth" lede="A ring and a small lift. Hairlines are shadows, so they never shift the grid.">
          <div className="grid gap-major sm:grid-cols-2">
            <div className="rounded-lg bg-surface p-major elevation-raised">
              <p className="font-heading text-heading text-fg-strong">elevation-raised</p>
              <p className="mt-minor text-ui text-fg-secondary">Cards, rows that lift, segmented thumbs.</p>
            </div>
            <div className="rounded-lg bg-raised p-major elevation-floating">
              <p className="font-heading text-heading text-fg-strong">elevation-floating</p>
              <p className="mt-minor text-ui text-fg-secondary">Menus, popovers, dialogs, toasts.</p>
            </div>
          </div>
        </Section>
      </div>
    </DocsShell>
  )
}
