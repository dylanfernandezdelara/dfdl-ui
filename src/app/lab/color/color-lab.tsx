"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import candidates from "./candidates.json"
import { CandidateScope, IDS, Section as SharedSection, Segmented, Toolbar, useSelection, type AxisDef, type CandidateId, type Selection as SharedSelection } from "../_shared/candidates"
import {
  DataRow,
  FloatingCard,
  GhostButton,
  NeutralButton,
  Paragraph,
  RaisedCard,
  SelectableList,
  SolidButton,
  StatusBadges,
  Swatch,
  TextInput,
  TintedButton,
} from "./specimens"

type Contrast = Record<string, number>
type CandidateMeta = { name: string; note: string; light?: { contrast?: Contrast; solid?: string }; dark?: { contrast?: Contrast; solid?: string } }
const meta = candidates as unknown as { neutrals: Record<CandidateId, CandidateMeta>; accents: Record<CandidateId, CandidateMeta>; depths: Record<CandidateId, CandidateMeta> }

type Axis = "neutral" | "accent" | "depth"
type Selection = SharedSelection<Axis>
const AXES: AxisDef<Axis>[] = [
  { axis: "neutral", param: "n", label: "Neutral" },
  { axis: "accent", param: "a", label: "Accent" },
  { axis: "depth", param: "d", label: "Depth" },
]
const ids = IDS
const byAxis: Record<Axis, Record<CandidateId, CandidateMeta>> = { neutral: meta.neutrals, accent: meta.accents, depth: meta.depths }

function Ratio({ value, floor = 4.5 }: { value?: number; floor?: number }) {
  if (value === undefined) return null
  const ok = value >= floor
  return (
    <span className={cn("font-mono text-xs tabular-nums", ok ? "text-fg-tertiary" : "text-danger")} title={ok ? `${value}:1` : `${value}:1, below ${floor}:1`}>
      {value.toFixed(1)}
    </span>
  )
}

/** One full specimen panel. Rendered once per appearance so both themes are visible at the same time. */
function Panel({ selection, dark }: { selection: Selection; dark: boolean }) {
  const n = meta.neutrals[selection.neutral]
  const a = meta.accents[selection.accent]
  const nc = (dark ? n.dark : n.light)?.contrast ?? {}
  const ac = (dark ? a.dark : a.light)?.contrast ?? {}
  return (
    <CandidateScope selection={selection} dark={dark} className="rounded-xl bg-page p-major text-fg hairline">
      <div className="mb-major flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-fg-tertiary">{dark ? "Dark" : "Light"}</span>
        <span className="font-mono text-xs text-fg-tertiary">{(dark ? a.dark : a.light)?.solid}</span>
      </div>

      <div className="grid grid-cols-8 gap-2">
        <Swatch className="bg-page" label="page" />
        <Swatch className="bg-subtle" label="subtle" />
        <Swatch className="bg-surface" label="surf" />
        <Swatch className="bg-surface-hover" label="hover" />
        <Swatch className="bg-surface-active" label="active" />
        <Swatch className="bg-sunken" label="sunken" />
        <Swatch className="bg-raised" label="raised" />
        <Swatch className="bg-line-subtle" label="ln·sub" />
        <Swatch className="bg-line" label="line" />
        <Swatch className="bg-line-strong" label="ln·str" />
        <Swatch className="bg-fg-tertiary" label="fg·3" sub={nc.fgTertiaryOnPage?.toFixed(1)} />
        <Swatch className="bg-fg-secondary" label="fg·2" sub={nc.fgSecondaryOnPage?.toFixed(1)} />
        <Swatch className="bg-fg" label="fg" sub={nc.fgOnPage?.toFixed(1)} />
        <Swatch className="bg-fg-strong" label="strong" sub={nc.fgStrongOnPage?.toFixed(1)} />
        <Swatch className="bg-accent-bg" label="acc·bg" />
        <Swatch className="bg-accent-solid" label="accent" sub={ac.onAccentOnSolid?.toFixed(1)} />
      </div>

      <div className="mt-major flex flex-wrap items-center gap-2">
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
      <div className="mt-major grid grid-cols-2 gap-major">
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

      <dl className="mt-major grid grid-cols-4 gap-x-major gap-y-1 font-mono text-xs text-fg-secondary">
        <dt>fg on page</dt>
        <dd><Ratio value={nc.fgOnPage} /></dd>
        <dt>secondary on page</dt>
        <dd><Ratio value={nc.fgSecondaryOnPage} /></dd>
        <dt>tertiary on page</dt>
        <dd><Ratio value={nc.fgTertiaryOnPage} floor={3} /></dd>
        <dt>on-accent on solid</dt>
        <dd><Ratio value={ac.onAccentOnSolid} /></dd>
        <dt>accent text on accent bg</dt>
        <dd><Ratio value={ac.accentTextOnAccentBg} /></dd>
        <dt>accent text on page</dt>
        <dd><Ratio value={ac.accentTextOnPage} /></dd>
      </dl>
    </CandidateScope>
  )
}

/** Three candidates of one axis side by side, holding the other two axes at the current selection. */
function Compare({ axis, selection, children, both }: { axis: Axis; selection: Selection; children: (s: Selection) => ReactNode; both?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-major">
      {ids.map((id) => {
        const s = { ...selection, [axis]: id } as Selection
        const m = byAxis[axis][id]
        return (
          <div key={id} className="min-w-0">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-mono text-xs text-fg-tertiary">{id.toUpperCase()}</span>
              <span className="text-sm font-medium text-fg-strong">{m.name}</span>
              {id === "a" ? <span className="font-mono text-xs uppercase tracking-wider text-fg-tertiary">baseline</span> : null}
            </div>
            <CandidateScope selection={s} className="rounded-lg border border-line bg-page p-major text-fg">
              {children(s)}
            </CandidateScope>
            {both ? (
              <CandidateScope selection={s} dark className="mt-2 rounded-lg border border-line bg-page p-major text-fg">
                {children(s)}
              </CandidateScope>
            ) : null}
            <p className="mt-2 text-xs leading-5 text-fg-secondary">{m.note}</p>
          </div>
        )
      })}
    </div>
  )
}

export function ColorLab() {
  const { selection, set } = useSelection(AXES)
  return (
    <>
      <Toolbar>
        {AXES.map(({ axis, label }) => (
          <Segmented key={axis} label={label} value={selection[axis]} options={ids.map((id) => ({ id, name: byAxis[axis][id].name }))} onChange={(id) => set(axis, id)} />
        ))}
      </Toolbar>

      <SharedSection title="Together" lede="The current selection applied to everything, light and dark at once. This is the view to judge; the sections below isolate one decision at a time.">
        <div className="grid grid-cols-2 gap-major">
          <Panel selection={selection} dark={false} />
          <Panel selection={selection} dark />
        </div>
      </SharedSection>

      <SharedSection title="Neutral" lede="Temperature of the surfaces and text. Text lightness is held constant across candidates so only the hue moves. A is dylanfdl.com today: warm cream surfaces with cool slate text.">
        <Compare axis="neutral" selection={selection}>
          {() => (
            <div className="flex flex-col gap-major">
              <div className="grid grid-cols-4 gap-2">
                <Swatch className="bg-page" label="page" />
                <Swatch className="bg-surface-hover" label="hover" />
                <Swatch className="bg-line" label="line" />
                <Swatch className="bg-fg" label="fg" />
              </div>
              <Paragraph />
              <div className="flex gap-2">
                <NeutralButton>Cancel</NeutralButton>
                <GhostButton>Learn more</GhostButton>
              </div>
            </div>
          )}
        </Compare>
      </SharedSection>

      <SharedSection title="Accent" lede="Three hues at identical lightness and identical relative vividness, so the comparison is hue alone. Shown both ways: solid fill with light text (shadcn) and tinted fill with dark text (kitze).">
        <Compare axis="accent" selection={selection}>
          {() => (
            <div className="flex flex-col gap-major">
              <div className="flex flex-wrap gap-2">
                <SolidButton>Save changes</SolidButton>
                <TintedButton>Fork</TintedButton>
              </div>
              <Paragraph />
              <TextInput focused />
              <SelectableList />
            </div>
          )}
        </Compare>
      </SharedSection>

      <SharedSection title="Depth" lede="How raised and floating surfaces separate from the page. A is the current recipe: jakub's ring and lift in light, gooey's inset ring in dark. Each candidate is shown light over dark.">
        <Compare axis="depth" selection={selection} both>
          {() => (
            <div className="flex flex-col gap-major">
              <RaisedCard />
              <FloatingCard />
            </div>
          )}
        </Compare>
      </SharedSection>
    </>
  )
}
