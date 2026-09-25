import type { Metadata } from "next"

import { Code } from "@/components/docs/code"
import { DocsShell, PageTitle, Section } from "@/components/docs/shell"
import tokens from "@/generated/tokens.json"

import { CurvePlot } from "@/app/lab/motion/decide"
import { MotionDemos } from "./demos"

export const metadata: Metadata = { title: "Motion" }

const durations: [string, string, string][] = [
  ["instant", "motion-instant", "tooltips; anything seen tens of times a day"],
  ["fast", "motion-fast", "hover, press, switches, color changes"],
  ["normal", "motion-normal", "menus, popovers, toasts"],
  ["slow", "motion-slow", "dialogs and their backdrops"],
  ["slower", "motion-slower", "drawers and sheets"],
]

export default function MotionPage() {
  const m = tokens.motion as Record<string, string>
  return (
    <DocsShell>
      <div className="max-w-content">
        <PageTitle
          eyebrow="Foundations"
          title="Motion"
          lede="Strong ease-out, durations by frequency, exits a quarter shorter than enters."
        />

        <Section title="Curves" lede="The approved curve covers most of the distance in the first third.">
          <div className="grid gap-major sm:grid-cols-3">
            <div>
              <CurvePlot id="a" />
              <p className="mt-minor font-mono text-caption text-fg">ease-out</p>
              <p className="text-caption text-fg-secondary">Enter and exit. Popovers, dialogs, toasts, tooltips, color changes.</p>
            </div>
            <div>
              <p className="flex h-18 items-center font-mono text-caption text-fg-tertiary">cubic-bezier(0.77, 0, 0.175, 1)</p>
              <p className="mt-minor font-mono text-caption text-fg">ease-in-out</p>
              <p className="text-caption text-fg-secondary">Movement on screen: tab indicators, reordering, a panel that slides aside.</p>
            </div>
            <div>
              <p className="flex h-18 items-center font-mono text-caption text-fg-tertiary">cubic-bezier(0.32, 0.72, 0, 1)</p>
              <p className="mt-minor font-mono text-caption text-fg">ease-drawer</p>
              <p className="text-caption text-fg-secondary">Drawers and sheets. The spring (`ease-spring`) is for drag-driven motion only.</p>
            </div>
          </div>
        </Section>

        <Section title="Durations by frequency" lede="The more often it happens, the shorter it is. Keyboard actions do not animate.">
          <ul className="max-w-reading">
            {durations.map(([k, v, use]) => (
              <li key={k} className="flex h-8 items-center gap-major text-ui">
                <span className="w-24 shrink-0 font-mono text-fg">{k}</span>
                <span className="w-16 shrink-0 font-mono tabular-nums text-fg-secondary">{m[v]}</span>
                <span className="text-fg-secondary">{use}</span>
              </li>
            ))}
          </ul>
          <Code>{`exit duration  = enter × ${m["motion-exit-factor"]}\npress          = scale(${m["motion-press"]}) over motion-fast, :active only, dropped under reduced motion\npop-in         = opacity 0→1 + scale ${m["motion-pop-scale"]}→1 from the trigger's transform-origin\ndialog         = opacity + scale 0.96→1 from center, backdrop fades in step\ndrawer         = translateY(100%)→0 on ease-drawer\ntoast          = translateY(16px)→0, leaves the way it came`}</Code>
        </Section>

        <Section title="Live" lede="Real transitions. Slow them down to see the curve.">
          <MotionDemos />
        </Section>

        <Section title="Rules" lede="What review blocks on.">
          <ul className="max-w-reading list-disc space-y-minor pl-5 text-ui text-fg">
            <li>Only `transform`, `translate`, `scale` and `opacity` animate. Never `width`, `height`, `top`, `left`, `margin`.</li>
            <li>Name the properties: `transition-interactive`, `transition-icon`. Never `transition: all`.</li>
            <li>Transitions, not keyframes, for anything a user can fire twice in a second.</li>
            <li>Enters start in `@starting-style`; exits live in the closed state; `display` flips with `allow-discrete`. Enter and exit may differ.</li>
            <li>Popovers scale from the trigger (`transform-origin: var(--transform-origin)`); dialogs are the exception and scale from center.</li>
            <li>Reduced motion keeps opacity and color and drops movement and scale. Never a blanket kill switch.</li>
            <li>Verify with `document.getAnimations()` after the interaction (`scripts/probes/animations.js`). The CSS is not the proof.</li>
          </ul>
        </Section>
      </div>
    </DocsShell>
  )
}
