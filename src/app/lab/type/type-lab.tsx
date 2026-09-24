"use client"

import { CandidateScope, Compare, IDS, PinButton, Section, Segmented, Shortlist, Toolbar, describe, useSelection, type AxisDef, type CandidateId, type Selection } from "../_shared/candidates"
import { Article, ConcentricCard, DensePanel, TypeSpecimen } from "./specimens"

type Axis = "scale" | "serif" | "radius"
const axes: AxisDef<Axis>[] = [
  { axis: "scale", param: "s", label: "Scale" },
  { axis: "serif", param: "f", label: "Serif" },
  { axis: "radius", param: "r", label: "Radius" },
]

const meta: Record<Axis, Record<CandidateId, { name: string; note: string }>> = {
  scale: {
    a: { name: "Current", note: "dylanfdl.com today: 16/24 body, 14/20 UI, Lora 24 display at weight 400, one heading size at 500." },
    b: { name: "Roles", note: "Jakub's role scale: Display 36, Title 24, Heading 18, Body 16, UI 14, Caption 13. Hierarchy comes from size; headings at 600 with negative tracking." },
    c: { name: "Weight-led", note: "jakub.kr and benji.org: body, headings and titles share 15px; hierarchy from weight 550 and color. UI 13px at 450. Display 32 stays serif." },
  },
  serif: {
    a: { name: "Display only", note: "Lora on the page title, pull quotes and italic emphasis. Headings inside content are sans." },
    b: { name: "All headings", note: "Lora on every heading level. The article reads more editorial; the app panel's section headers go serif too." },
    c: { name: "None", note: "Sans everywhere, including the title. Lora survives only as italic emphasis inside a sentence." },
  },
  radius: {
    a: { name: "Current", note: "xs 4 · sm 6 · md 8 · lg 12 · xl 16. Buttons and inputs at sm, cards at lg." },
    b: { name: "Soft", note: "xs 6 · sm 8 · md 10 · lg 14 · xl 20. Kitze's family; noticeably friendlier at control size." },
    c: { name: "Round", note: "xs 8 · sm 10 · md 12 · lg 16 · xl 24. Fork's 0.625rem family; closest to ChatGPT and Linear." },
  },
}

function Everything({ dark }: { dark: boolean }) {
  return (
    <>
      <span className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">{dark ? "Dark" : "Light"}</span>
      <div className="mt-major">
        <Article />
      </div>
      <div className="mt-12">
        <DensePanel />
      </div>
      <div className="mt-major max-w-sm">
        <ConcentricCard />
      </div>
    </>
  )
}

export function TypeLab() {
  const { selection, set, load, pins, pin, unpin, isPinned } = useSelection(axes)
  return (
    <>
      <Toolbar>
        {axes.map(({ axis, label }) => (
          <Segmented key={axis} label={label} value={selection[axis]} options={IDS.map((id) => ({ id, name: meta[axis][id].name, note: meta[axis][id].note }))} onChange={(id) => set(axis, id)} />
        ))}
        <PinButton pinned={isPinned} onPin={pin} />
      </Toolbar>

      <Section title="Together" lede={`Current selection: ${describe(axes, selection, meta)}. Hover a control for what each candidate changes. Press g to check the rhythm.`}>
        <div className="grid grid-cols-2 gap-major">
          {[false, true].map((dark) => (
            <CandidateScope key={String(dark)} selection={selection} dark={dark} className="rounded-xl border border-line bg-page p-major text-fg">
              <Everything dark={dark} />
            </CandidateScope>
          ))}
        </div>
      </Section>

      <Section title="Shortlist" lede="Pin the combinations you want to weigh against each other. Each renders in full, light and dark, and the list travels in the URL, so pasting it back is your answer.">
        <Shortlist axes={axes} pins={pins} meta={meta} current={selection} onLoad={(s: Selection<Axis>) => load(s)} onUnpin={unpin}>
          {(_, dark) => <Everything dark={dark} />}
        </Shortlist>
      </Section>

      <Section title="Scale" lede="Same content, three ways of building hierarchy. B leans on size, C leans on weight. Look at the dense panel especially: that is where 13px versus 14px and weight 450 versus 400 show up.">
        <Compare axis="scale" selection={selection} meta={meta.scale}>
          {() => <TypeSpecimen />}
        </Compare>
        <div className="mt-major">
          <Compare axis="scale" selection={selection} meta={meta.scale} stacked>
            {() => <DensePanel />}
          </Compare>
        </div>
      </Section>

      <Section title="Serif" lede="Where Lora is allowed. The article shows it most; the app panel's section header is the tell for whether headings inside UI should ever be serif.">
        <Compare axis="serif" selection={selection} meta={meta.serif}>
          {() => (
            <div className="flex flex-col gap-major">
              <Article />
            </div>
          )}
        </Compare>
      </Section>

      <Section title="Radius" lede="Concentric nesting is enforced in every candidate: the card wraps a field wraps a chip, outer radius equals inner plus padding. The pill on the right is a constant.">
        <Compare axis="radius" selection={selection} meta={meta.radius} both>
          {() => <ConcentricCard />}
        </Compare>
      </Section>
    </>
  )
}
