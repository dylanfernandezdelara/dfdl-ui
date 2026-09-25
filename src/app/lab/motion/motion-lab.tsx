"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import { radioGroupKeys } from "@/lib/radio-group"
import { cn } from "@/lib/utils"

import { CandidateScope, Compare, IDS, PinButton, Section, Segmented, Shortlist, Toolbar, describe, encode, useSelection, type AxisDef, type CandidateId, type Selection } from "../_shared/candidates"
import { CurvePlot, RECOMMENDED, SyncRow, WHY } from "./decide"
import { DialogSpec, DrawerSpec, PopoverSpec, PressRow, SwitchSpec, TabsSpec, ToastSpec, TooltipSpec } from "./specimens"

type Axis = "curve" | "exit" | "press"
const axes: AxisDef<Axis>[] = [
  { axis: "curve", param: "c", label: "Curve" },
  { axis: "exit", param: "x", label: "Exit" },
  { axis: "press", param: "p", label: "Press" },
]

const meta: Record<Axis, Record<CandidateId, { name: string; note: string }>> = {
  curve: {
    a: { name: "Strong out", note: "Approved. Emil's cubic-bezier(0.23, 1, 0.32, 1): almost all the distance in the first third, long settle. Drawers on the iOS curve (0.32, 0.72, 0, 1)." },
    b: { name: "Fork before", note: "Built-in `ease` on everything, drawers included. Symmetric S-curve; starts slow, which is the part Emil objects to." },
    c: { name: "Decelerate", note: "Material's cubic-bezier(0, 0, 0.2, 1): decelerating but gentler than B. Drawers on the same curve." },
  },
  exit: {
    a: { name: "Shorter", note: "Approved. Exits at 75% of the enter duration, same path. No reference site shortens its exits; Emil and Jakub recommend it." },
    b: { name: "Symmetric", note: "Exits take as long as enters and reverse the same path." },
    c: { name: "Fade out", note: "Exits at 50%, opacity only. Nothing scales or moves on the way out; enters are unchanged." },
  },
  press: {
    a: { name: "0.97", note: "Approved. Emil's default. Reads as a physical press without looking like a toy." },
    b: { name: "None", note: "Color change only on press. Fork before." },
    c: { name: "0.94", note: "Deeper press. Noticeable on large buttons, heavy on icon buttons." },
  },
}

/** Lab-only knobs, URL-carried, not decisions. */
function useKnobs() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const knobs = {
    speed: params.get("speed") === "slow" ? "slow" : "normal",
    reduced: params.get("reduced") === "on" ? "on" : "off",
    origin: params.get("origin") === "center" ? "center" : "trigger",
    drawer: params.get("drawer") === "spring" ? "spring" : "curve",
  } as const
  const set = useCallback(
    (key: keyof typeof knobs, value: string, def: string) => {
      const next = new URLSearchParams(params.toString())
      if (value === def) next.delete(key)
      else next.set(key, value)
      const qs = next.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [params, router, pathname],
  )
  return { knobs, set }
}

function Knob({ label, value, options, onChange }: { label: string; value: string; options: [string, string][]; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-minor">
      <span className="w-16 font-mono text-caption uppercase tracking-wider text-fg-tertiary">{label}</span>
      <div role="radiogroup" aria-label={label} onKeyDown={radioGroupKeys(options.map(([v]) => v), value, onChange)} className="flex h-8 rounded-md bg-sunken p-1 hairline">
        {options.map(([v, name]) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={v === value}
            tabIndex={v === value ? 0 : -1}
            onClick={() => onChange(v)}
            className={cn(
              "h-6 rounded-sm px-2 text-ui transition-interactive duration-fast ease-out press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
              v === value ? "bg-surface text-fg-strong elevation-raised" : "text-fg-secondary hover:text-fg",
            )}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

function Everything({ dark }: { dark: boolean }) {
  return (
    <>
      <span className="font-mono text-caption uppercase tracking-wider text-fg-tertiary">{dark ? "Dark" : "Light"}</span>
      <div className="mt-major">
        <PressRow />
      </div>
      <div className="mt-major flex flex-wrap items-start gap-major">
        <PopoverSpec />
        <TooltipSpec />
        <SwitchSpec />
      </div>
      <div className="mt-major">
        <TabsSpec />
      </div>
      <div className="mt-major">
        <DialogSpec />
      </div>
      <div className="mt-major flex items-start gap-major">
        <div className="min-w-0 flex-1">
          <ToastSpec />
        </div>
        <DrawerSpec />
      </div>
    </>
  )
}

function Decide({ selection, load }: { selection: Selection<Axis>; load: (s: Selection<Axis>) => void }) {
  const [speed, setSpeed] = useState<"normal" | "quarter" | "slow">("quarter")
  const isRec = encode(axes, selection) === encode(axes, RECOMMENDED)
  return (
    <Section title="Decide" lede="Three questions, each with all three answers firing at once. If you cannot tell them apart at ¼×, that is itself the answer: take the recommendation. It follows Emil's published recipe, and gooey and beautifului ship the same curve.">
      <div className="mb-12 flex min-h-12 flex-wrap items-center gap-major rounded-lg bg-accent-bg px-major py-minor">
        <p className="flex min-h-8 items-center text-ui text-accent-text">
          Recommended: <span className="font-medium">{describe(axes, RECOMMENDED, meta)}</span>, popover from the trigger, drawer on the curve, spring reserved for gestures.
        </p>
        <button
          type="button"
          onClick={() => load(RECOMMENDED)}
          disabled={isRec}
          className={cn(
            "ml-auto h-control rounded-sm bg-accent-solid px-3 text-ui font-medium text-fg-on-accent transition-interactive duration-fast ease-out press disabled:opacity-60",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
          )}
        >
          {isRec ? "Recommended is selected" : "Accept recommended"}
        </button>
      </div>

      <div className="flex flex-col gap-12">
        <div>
          <h3 className="font-heading text-heading text-fg-strong">1. Curve: how the distance is spent</h3>
          <p className="mt-1 mb-minor max-w-reading text-ui text-fg-secondary">{WHY.curve}</p>
          <SyncRow axis="curve" axes={axes} selection={selection} meta={meta.curve} recommended={RECOMMENDED.curve} speed={speed} onSpeed={setSpeed} playLabel="Open all three menus" hold={900}>
            {(s, open) => (
              <div className="flex flex-col gap-major">
                <CurvePlot id={s.curve} />
                <PopoverSpec open={open} />
                <div className="h-44" />
              </div>
            )}
          </SyncRow>
        </div>
        <div>
          <h3 className="font-heading text-heading text-fg-strong">2. Exit: how things leave</h3>
          <p className="mt-1 mb-minor max-w-reading text-ui text-fg-secondary">{WHY.exit}</p>
          <SyncRow axis="exit" axes={axes} selection={selection} meta={meta.exit} recommended={RECOMMENDED.exit} speed={speed} onSpeed={setSpeed} playLabel="Open and close all three dialogs" hold={900}>
            {(s, open) => <DialogSpec open={open} />}
          </SyncRow>
        </div>
        <div>
          <h3 className="font-heading text-heading text-fg-strong">3. Press: what a click feels like</h3>
          <p className="mt-1 mb-minor max-w-reading text-ui text-fg-secondary">{WHY.press}</p>
          <SyncRow axis="press" axes={axes} selection={selection} meta={meta.press} recommended={RECOMMENDED.press} speed={speed} onSpeed={setSpeed} playLabel="Press all three" hold={500}>
            {(s, open) => <PressRow pressed={open} />}
          </SyncRow>
        </div>
      </div>
    </Section>
  )
}

export function MotionLab() {
  const { selection, set, load, pins, pin, unpin, isPinned } = useSelection(axes)
  const { knobs, set: setKnob } = useKnobs()
  const knobAttrs = { "data-speed": knobs.speed, "data-reduced": knobs.reduced, "data-origin": knobs.origin, "data-drawer": knobs.drawer }
  return (
    <div {...knobAttrs}>
      <Toolbar>
        {axes.map(({ axis, label }) => (
          <Segmented key={axis} label={label} value={selection[axis]} options={IDS.map((id) => ({ id, name: meta[axis][id].name, note: meta[axis][id].note }))} onChange={(id) => set(axis, id)} />
        ))}
        <PinButton pinned={isPinned} onPin={pin} />
        <div className="flex w-full flex-wrap items-center gap-major pt-minor hairline-t">
          <Knob label="Speed" value={knobs.speed} options={[["normal", "1×"], ["slow", "0.1×"]]} onChange={(v) => setKnob("speed", v, "normal")} />
          <Knob label="Origin" value={knobs.origin} options={[["trigger", "Trigger"], ["center", "Center"]]} onChange={(v) => setKnob("origin", v, "trigger")} />
          <Knob label="Drawer" value={knobs.drawer} options={[["curve", "Curve"], ["spring", "Spring"]]} onChange={(v) => setKnob("drawer", v, "curve")} />
          <Knob label="Reduced" value={knobs.reduced} options={[["off", "Off"], ["on", "Preview"]]} onChange={(v) => setKnob("reduced", v, "off")} />
        </div>
      </Toolbar>

      <Decide selection={selection} load={load} />

      <Section title="Together" lede={`Current selection: ${describe(axes, selection, meta)}. Click everything. Set speed to 0.1× to see the curve; at 1× judge only how it feels. The bottom row of knobs are questions, not candidates: popover origin, drawer physics, and what reduced motion should keep.`}>
        <div className="grid grid-cols-2 gap-major">
          {[false, true].map((dark) => (
            <CandidateScope key={String(dark)} selection={selection} dark={dark} className="rounded-xl bg-page p-major text-fg hairline">
              <Everything dark={dark} />
            </CandidateScope>
          ))}
        </div>
      </Section>

      <Section title="Shortlist" lede="Pin combinations to compare whole motion systems. Each renders in full and stays interactive.">
        <Shortlist axes={axes} pins={pins} meta={meta} current={selection} onLoad={(s: Selection<Axis>) => load(s)} onUnpin={unpin}>
          {(_, dark) => <Everything dark={dark} />}
        </Shortlist>
      </Section>

      <Section title="Curve" lede="Same popover and drawer, three curves. This is the axis to judge at 0.1×: watch where the distance is spent. Then return to 1× and open each a few times without thinking.">
        <Compare axis="curve" selection={selection} meta={meta.curve}>
          {() => (
            <div className="flex flex-col gap-major">
              <PopoverSpec />
              <DrawerSpec />
            </div>
          )}
        </Compare>
      </Section>

      <Section title="Exit" lede="Open and close the dialog and the toast. The question is whether leaving should mirror arriving, be quicker, or simply get out of the way.">
        <Compare axis="exit" selection={selection} meta={meta.exit}>
          {() => (
            <div className="flex flex-col gap-major">
              <DialogSpec />
              <ToastSpec />
            </div>
          )}
        </Compare>
      </Section>

      <Section title="Press" lede="Hold each button. Press is feedback that the interface heard you; it runs tens of times a day, so it has to be near-imperceptible or absent.">
        <Compare axis="press" selection={selection} meta={meta.press}>
          {() => <PressRow />}
        </Compare>
      </Section>
    </div>
  )
}
