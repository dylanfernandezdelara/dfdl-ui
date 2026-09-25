/*
  Baseline audit. Paste or eval in the page (agent-browser eval "$(cat scripts/probes/baseline.js)").
  For every inline box that sits inside running text (an animated word, a badge, a kbd, an icon label), compares
  the bottom of its text to the bottom of the sentence text on the same line. Same font and size only, so the
  glyph boxes are comparable. An offset of half a pixel is already a bug: it becomes a visible pixel at a larger size.
*/
(() => {
  const textRect = (node) => {
    const r = document.createRange()
    r.selectNodeContents(node)
    const rects = [...r.getClientRects()].filter((x) => x.width > 0)
    return rects[0]
  }
  const firstText = (el) => {
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT) })
    return w.nextNode()
  }
  const offenders = []
  let checked = 0
  for (const block of document.querySelectorAll('p, li, dd, td, h1, h2, h3, h4, figcaption, blockquote, label')) {
    const sentence = [...block.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim())
    if (!sentence) continue
    const base = textRect(sentence)
    if (!base) continue
    const bcs = getComputedStyle(block)
    for (const el of block.querySelectorAll('*')) {
      const cs = getComputedStyle(el)
      if (!/^inline-(block|flex|grid)$/.test(cs.display)) continue
      // Report the innermost box only; a wrapper inherits its child's offset.
      if ([...el.querySelectorAll('*')].some((c) => /^inline-(block|flex|grid)$/.test(getComputedStyle(c).display))) continue
      const t = firstText(el)
      if (!t) continue
      const tcs = getComputedStyle(t.parentElement)
      if (tcs.fontSize !== bcs.fontSize || tcs.fontFamily !== bcs.fontFamily) continue
      const r = textRect(t)
      if (!r || Math.abs(r.top - base.top) > base.height) continue // different line
      checked++
      const off = +(r.bottom - base.bottom).toFixed(2)
      if (Math.abs(off) >= 0.5) {
        offenders.push({ text: el.textContent.trim().slice(0, 24), cls: String(el.className).slice(0, 60), offset: off, why: `text sits ${Math.abs(off)}px ${off < 0 ? 'above' : 'below'} the sentence baseline (vertical-align: ${cs.verticalAlign})` })
      }
    }
  }
  return JSON.stringify({ summary: `${offenders.length} of ${checked} inline boxes off the text baseline`, offenders })
})()
