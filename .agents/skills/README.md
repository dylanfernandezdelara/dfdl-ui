# Reference skills

Third-party skills vendored for agents working in this repo. The dfdl skill hands off to these by name and never copies their rules. Re-sync by re-cloning at a newer commit and replacing the directory; do not edit in place.

| Source | Commit | Skills |
| --- | --- | --- |
| emilkowalski/skills | 85e8e23 | animate, animation-vocabulary, emil-design-eng, find-animation-opportunities, improve-animations, pick-ui-library, prototype, review-animations |
| jakubkrehel/skills | 267330e | better-accessibility, better-colors, better-interface, better-layout, better-typography, better-ui, better-writing, break, explain-interface, interface-review, variant |
| figma/mcp-server-guide | d638a5e | figma-use, figma-use-motion, figma-generate-library, figma-generate-design, figma-design-to-code, figma-implement-motion, figma-code-connect, figma-create-new-file |

Skills not relevant to this project (Swift, Expo, FigJam, Slides, shaders, generative plugins, diagrams, Sonner) were left out.

The dfdl skill itself will live at `skills/dfdl-ui/` at the repo root once it exists, so it can be installed with `npx skills add dylanfernandezdelara/dfdl-ui`.
