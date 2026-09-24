# 3b: Fork before/after with motion tokens

Same worktree as 1b (`../treeGPT-dfdl-tokens`, branch `agent/dfdl-tokens`, never pushed), now on indigo (`<html data-accent="indigo">`). Motion retokened two ways: ten `transition`/`animation` declarations in `index.css` swapped from literal `ease`/ms to `--motion-*` tokens, and a motion block appended to `src/dfdl/map.css` giving the chat menu a pop-in and every pressable a 0.97 press.

## Probe results (`document.getAnimations()` right after the interaction)

| Interaction | Before | After |
| --- | --- | --- |
| Chat options menu open | nothing animates; menu appears instantly | `opacity 0→1`, `scale 0.95→1`, 200ms `cubic-bezier(0.23, 1, 0.32, 1)`, origin top right (the trigger) |
| Open a chat (thought row enter) | `cot-enter 360ms ease-out` keyframes | `opacity 0→1` 200ms; row animation on `--motion-slow` and the approved curve |
| Icon button press | `transition: all 0s ease` (none) | `transform, scale, background, color, opacity` 150ms on the approved curve; `:active` scale 0.97 |

`menu-popin-filmstrip.png`: six frames of the menu opening at 1/7.5 speed. Most of the distance is covered in the first frame, which is the strong ease-out doing what it is for.

## Found for Phase 5 (not fixed here)

- Sidebar collapse animates `width` (layout). Should be `translate` on the panel and a width change without transition.
- `.button` uses `transition-all`.
- Dialog uses tw-animate keyframes at 100ms fade only; should be the dialog recipe (opacity + scale 0.96, 300ms, backdrop in step) as a transition.
- Chat menu unmounts on close, so the exit cannot animate without a component change (keep mounted, `data-state`, `allow-discrete`).
- Drag handle animates `top`.
