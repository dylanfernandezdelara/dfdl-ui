/**
 * Grid audit: measures visible blocks against the 8px baseline (4px half-step tolerated) and marks offenders.
 * The same logic ships as scripts/probes/grid.js for agents driving a browser. Keep the two in step.
 */
const MINOR = 8
const HALF = 4
const TOL = 0.51
const SKIP = new Set(["SCRIPT", "STYLE", "SVG", "PATH", "BR", "WBR", "TEMPLATE", "NOSCRIPT", "HTML", "HEAD"])

export type Offender = { el: Element; top: number; height: number; why: string[] }

const off = (v: number, step: number) => {
  const r = Math.abs(v % step)
  return Math.min(r, step - r) > TOL
}

export function auditGrid(root: ParentNode = document.body): { checked: number; offenders: Offender[] } {
  const offenders: Offender[] = []
  let checked = 0
  for (const el of Array.from(root.querySelectorAll("*"))) {
    if (SKIP.has(el.tagName.toUpperCase()) || el.closest("[data-layout-grid-overlay],[data-layout-grid-toolbar],[data-grid-ignore]")) continue
    const cs = getComputedStyle(el)
    if (cs.display === "none" || cs.display === "inline" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) continue
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) continue
    checked++
    const top = r.top + window.scrollY
    const why: string[] = []
    if (off(top, HALF)) why.push(`top ${top.toFixed(1)} off 4px grid`)
    else if (off(top, MINOR)) why.push(`top ${top.toFixed(1)} on half-step`)
    const lh = parseFloat(cs.lineHeight)
    const isText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent?.trim())
    if (isText && lh && off(lh, HALF)) why.push(`line-height ${lh} off 4px`)
    if (!isText && r.height <= 600 && off(r.height, HALF)) why.push(`height ${r.height.toFixed(1)} off 4px`)
    const parent = el.parentElement
    const pd = parent ? getComputedStyle(parent) : null
    const inRow = pd && ((/flex/.test(pd.display) && !/column/.test(pd.flexDirection)) || /grid/.test(pd.display))
    if (parent && pd && !inRow && cs.position !== "absolute" && cs.position !== "fixed") {
      const left = r.left - parent.getBoundingClientRect().left - parseFloat(pd.borderLeftWidth) - parseFloat(pd.paddingLeft)
      if (Math.abs(left) > TOL && off(left, HALF)) why.push(`left ${left.toFixed(1)} off 4px`)
    }
    // Half-step tops are tolerated (centered 24px line in a 48px row); everything else is an offender.
    const strict = why.filter((w) => !w.includes("half-step"))
    if (strict.length) offenders.push({ el, top, height: r.height, why: strict })
  }
  return { checked, offenders }
}

/** Marks offenders with data-grid-offender (styled by layout-grid.css) and returns the count. */
export function markOffenders(root: ParentNode = document.body): { checked: number; marked: number } {
  for (const el of Array.from(root.querySelectorAll("[data-grid-offender]"))) el.removeAttribute("data-grid-offender")
  const { checked, offenders } = auditGrid(root)
  for (const o of offenders) o.el.setAttribute("data-grid-offender", o.why.join("; "))
  return { checked, marked: offenders.length }
}

export function clearOffenders(root: ParentNode = document.body) {
  for (const el of Array.from(root.querySelectorAll("[data-grid-offender]"))) el.removeAttribute("data-grid-offender")
}
