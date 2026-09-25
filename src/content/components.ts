/**
 * Component docs as data. Each entry renders at /components/<slug>; example names are files in
 * src/components/examples, shown live and as source. Keep descriptions to one line.
 */
export type Prop = { name: string; type: string; default?: string; description: string }
export type Example = { name: string; title: string; description?: string }
export type ComponentDoc = {
  slug: string
  name: string
  description: string
  base?: { name: string; href: string }
  demo: string
  /** Scale the demo down in the gallery tile when it is larger than the tile. */
  compact?: boolean
  usage: string
  examples: Example[]
  props: Prop[]
}

const baseUi = (part: string, name: string) => ({ name, href: `https://base-ui.com/react/components/${part}` })

export const COMPONENTS: ComponentDoc[] = [
  {
    slug: "badge",
    name: "Badge",
    description: "A short status label.",
    demo: "badge-demo",
    usage: `import { Badge } from "@/components/ui/badge"

<Badge variant="success">Passed</Badge>`,
    examples: [],
    props: [{ name: "variant", type: `"neutral" | "accent" | "success" | "warning" | "danger"`, default: `"neutral"`, description: "Color role." }],
  },
  {
    slug: "button",
    name: "Button",
    description: "Triggers an action.",
    base: baseUi("button", "Button"),
    demo: "button-demo",
    usage: `import { Button } from "@/components/ui/button"

<Button>Save changes</Button>`,
    examples: [
      { name: "button-variants", title: "Variants", description: "One primary per view. Danger only for destructive actions." },
      { name: "button-sizes", title: "Sizes", description: "32px by default, 28 in dense rows, 40 for touch." },
      { name: "button-with-icon", title: "With icon" },
    ],
    props: [
      { name: "variant", type: `"primary" | "secondary" | "ghost" | "danger"`, default: `"primary"`, description: "Visual weight." },
      { name: "size", type: `"sm" | "md" | "lg" | "icon"`, default: `"md"`, description: "Height: 28, 32, 40, or a 32px square." },
      { name: "disabled", type: "boolean", default: "false", description: "Stays focusable with focusableWhenDisabled." },
    ],
  },
  {
    slug: "card",
    name: "Card",
    description: "Groups related content on a raised surface.",
    demo: "card-demo",
    compact: true,
    usage: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Weekly digest</CardTitle>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>`,
    examples: [],
    props: [
      { name: "Card", type: `ComponentProps<"div">`, description: "24px padding, 16px radius, raised." },
      { name: "CardTitle", type: `ComponentProps<"h3">`, description: "Heading role." },
      { name: "CardDescription", type: `ComponentProps<"p">`, description: "Secondary text." },
    ],
  },
  {
    slug: "dialog",
    name: "Dialog",
    description: "A modal window for a decision that interrupts the flow.",
    base: baseUi("dialog", "Dialog"),
    demo: "dialog-demo",
    usage: `import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Title</DialogTitle>
  </DialogContent>
</Dialog>`,
    examples: [],
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the dialog opens or closes." },
      { name: "defaultOpen", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
    ],
  },
  {
    slug: "input",
    name: "Input",
    description: "A single-line text field.",
    base: baseUi("input", "Input"),
    demo: "input-demo",
    usage: `import { Input } from "@/components/ui/input"

<Input placeholder="Search" />`,
    examples: [{ name: "input-with-button", title: "With button" }],
    props: [{ name: "…props", type: `ComponentProps<"input">`, description: "Any input attribute. aria-invalid shows the error ring." }],
  },
  {
    slug: "kbd",
    name: "Kbd",
    description: "A keyboard key or shortcut.",
    demo: "kbd-demo",
    usage: `import { Kbd } from "@/components/ui/kbd"

<Kbd>⌘</Kbd><Kbd>K</Kbd>`,
    examples: [],
    props: [{ name: "…props", type: `ComponentProps<"kbd">`, description: "One key per Kbd." }],
  },
  {
    slug: "menu",
    name: "Menu",
    description: "A list of actions that opens from a button.",
    base: baseUi("menu", "Menu"),
    demo: "menu-demo",
    usage: `import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu"

<Menu>
  <MenuTrigger>Options</MenuTrigger>
  <MenuContent>
    <MenuItem>Rename</MenuItem>
  </MenuContent>
</Menu>`,
    examples: [],
    props: [
      { name: "MenuContent align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Alignment against the trigger." },
      { name: "MenuItem variant", type: `"default" | "danger"`, default: `"default"`, description: "Danger for destructive items." },
      { name: "MenuItem onClick", type: "() => void", description: "Runs the action and closes the menu." },
    ],
  },
  {
    slug: "segmented-control",
    name: "Segmented control",
    description: "One choice from a few options, all visible.",
    base: baseUi("toggle-group", "Toggle Group"),
    demo: "segmented-control-demo",
    usage: `import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControlItem value="all">All</SegmentedControlItem>
  <SegmentedControlItem value="house">House</SegmentedControlItem>
</SegmentedControl>`,
    examples: [],
    props: [
      { name: "value", type: "string", description: "The selected item." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called with the new value." },
      { name: "defaultValue", type: "string", description: "Initial selection when uncontrolled." },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    description: "Turns a setting on or off, effective immediately.",
    base: baseUi("switch", "Switch"),
    demo: "switch-demo",
    usage: `import { Switch } from "@/components/ui/switch"

<Switch defaultChecked />`,
    examples: [],
    props: [
      { name: "checked", type: "boolean", description: "Controlled state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when toggled." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "Switches between views in the same place.",
    base: baseUi("tabs", "Tabs"),
    demo: "tabs-demo",
    compact: true,
    usage: `import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
  </TabsList>
  <TabsPanel value="overview">…</TabsPanel>
</Tabs>`,
    examples: [],
    props: [
      { name: "value", type: "string", description: "The active tab." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the tab changes." },
      { name: "defaultValue", type: "string", description: "Initial tab when uncontrolled." },
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    description: "Labels a control that has no visible text.",
    base: baseUi("tooltip", "Tooltip"),
    demo: "tooltip-demo",
    usage: `import { Tooltip } from "@/components/ui/tooltip"

<Tooltip content="Notifications">
  <Button size="icon" aria-label="Notifications"><Bell /></Button>
</Tooltip>`,
    examples: [],
    props: [
      { name: "content", type: "ReactNode", description: "The label." },
      { name: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"top"`, description: "Where it opens." },
      { name: "children", type: "ReactElement", description: "The trigger. Needs an aria-label of its own." },
    ],
  },
]

export const componentBySlug = (slug: string) => COMPONENTS.find((c) => c.slug === slug)
