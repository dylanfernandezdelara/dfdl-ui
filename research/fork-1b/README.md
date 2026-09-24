# 1b: Fork before/after with Lab 1 tokens

Fork (`~/Projects/treeGPT`, worktree `../treeGPT-dfdl-tokens` on branch `agent/dfdl-tokens`, never pushed) rendered with mocked session and chats, then retokened by pointing its ~15 own variables and the shadcn set at dfdl tokens (`src/dfdl/map.css`). No component changes. Fork has no dark mode; the dark shots come free from the tokens and show where Fork hardcodes light values (composer fade, header fade).

- `accent-light.png`, `accent-dark.png`: the decision boards. Before vs ember at 45% (the inherited vividness) vs ember at 60%, on the accent-bearing region: fork link, user bubble, active send button.
- `light-*.png`, `dark-*.png`: full-screen boards for empty state, chat with thinking, split fork view, model menu.

Mock and capture scripts lived in `/tmp/fork-mock` during the session; the mapping file is the reusable artifact.
