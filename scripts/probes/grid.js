/*
  Grid audit. Paste or eval in the page (agent-browser eval "$(cat scripts/probes/grid.js)").
  Measures every visible block against the 8px baseline grid (4px half-step tolerated) and returns offenders.

  Checks per element: top edge (page coordinates), height, and left edge relative to the nearest
  positioned ancestor. Text nodes are judged by their line box, so a paragraph whose top sits on the grid
  and whose line-height is a multiple of 8 passes even if its glyphs do not touch the lines.

  Returns { checked, offenders: [{ tag, cls, top, left, height, why }], summary }.
*/
(() => {
  const MINOR = 8, HALF = 4, TOL = 0.51
  const off = (v, step) => { const r = Math.abs(v % step); return Math.min(r, step - r) > TOL }
  const skip = new Set(['SCRIPT','STYLE','SVG','PATH','IMG','BR','WBR','TEMPLATE','NOSCRIPT','HTML','HEAD'])
  const isVisible = (el, cs) => cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0
  const root = document.querySelector('[data-grid-audit-root]') || document.body
  const offenders = []
  let checked = 0
  for (const el of root.querySelectorAll('*')) {
    if (skip.has(el.tagName.toUpperCase()) || el.closest('[data-layout-grid-overlay],[data-layout-grid-toolbar],[data-grid-ignore]')) continue
    const cs = getComputedStyle(el)
    if (!isVisible(el, cs)) continue
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) continue
    // Inline text runs are judged via their parent block; skip pure inline elements.
    if (cs.display === 'inline') continue
    checked++
    const top = r.top + window.scrollY
    const why = []
    // A text leaf centered inside a flex row is placed by the row; the row's box is what must sit on the grid.
    const parentCs = el.parentElement ? getComputedStyle(el.parentElement) : null
    const leafText = el.children.length === 0 && el.textContent.trim().length > 0
    const centeredInRow = leafText && parentCs && /flex/.test(parentCs.display) && parentCs.alignItems === 'center'
    if (!centeredInRow) {
      if (off(top, HALF)) why.push(`top ${top.toFixed(1)} off 4px grid`)
      else if (off(top, MINOR)) why.push(`top ${top.toFixed(1)} on half-step`)
    }
    // Heights: controls and rows must be multiples of 4; text blocks are judged by line-height.
    const lh = parseFloat(cs.lineHeight)
    const isText = el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())
    if (isText && lh && off(lh, HALF)) why.push(`line-height ${lh} off 4px`)
    // Heights are judged for controls, rows and cards, not for page-length containers.
    if (!isText && r.height <= 600 && off(r.height, HALF)) why.push(`height ${r.height.toFixed(1)} off 4px`)
    // Horizontal: only block-flow and grid children have a meaningful left edge. Flex-row siblings after
    // variable-width text land wherever the text ends; that is not a grid question.
    const parent = el.parentElement
    const pd = parent ? getComputedStyle(parent) : null
    const inRow = pd && ((/flex/.test(pd.display) && !/column/.test(pd.flexDirection)) || /grid/.test(pd.display) || /table/.test(pd.display))
    if (parent && pd && !inRow && cs.position !== 'absolute' && cs.position !== 'fixed') {
      const left = r.left - parent.getBoundingClientRect().left - parseFloat(pd.borderLeftWidth) - parseFloat(pd.paddingLeft)
      if (Math.abs(left) > TOL && off(left, HALF)) why.push(`left ${left.toFixed(1)} off 4px`)
    }
    if (why.length) offenders.push({ tag: el.tagName.toLowerCase(), cls: (el.className && typeof el.className === 'string' ? el.className : '').split(' ').slice(0, 3).join(' '), top: +top.toFixed(1), left: +r.left.toFixed(1), height: +r.height.toFixed(1), why })
  }
  const strict = offenders.filter(o => o.why.some(w => !w.includes('half-step')))
  return JSON.stringify({ checked, offenders: strict.slice(0, 60), total: strict.length, halfStep: offenders.length - strict.length, summary: `${strict.length} of ${checked} blocks off the 4px grid; ${offenders.length - strict.length} more sit on the 4px half-step rather than 8` })
})()
