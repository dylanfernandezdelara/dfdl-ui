(() => {
  const anims = document.getAnimations().filter(a => a.playState !== 'finished' || (a.currentTime !== null && a.currentTime < 50));
  return JSON.stringify(anims.map(a => {
    const e = a.effect; const t = e && e.target; const k = e.getKeyframes ? e.getKeyframes() : [];
    const tm = e.getTiming();
    const prop = a.transitionProperty || (k[0] && Object.keys(k[0]).filter(x=>!['offset','computedOffset','easing','composite'].includes(x))[0]);
    return { type: a.constructor.name, prop, target: t && (t.className || '').toString().split(' ').find(c=>c.startsWith('spec-')) || (t && t.tagName), dur: tm.duration, ease: tm.easing, from: k[0] && k[0][prop], to: k[k.length-1] && k[k.length-1][prop] };
  }));
})()
