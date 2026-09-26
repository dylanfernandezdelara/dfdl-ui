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
  /** Verified in the browser with getAnimations(). */
  motion?: string
}

const baseUi = (part: string, name: string) => ({ name, href: `https://base-ui.com/react/components/${part}` })

export const COMPONENTS: ComponentDoc[] = [
  {
    slug: "avatar",
    name: "Avatar",
    description: "A person's photo, with initials while it loads or if it fails.",
    base: baseUi("avatar", "Avatar"),
    demo: "avatar-demo",
    usage: `import { Avatar } from "@/components/ui/avatar"

<Avatar src="/pelosi.jpg" alt="Nancy Pelosi" fallback="NP" />`,
    examples: [],
    props: [
      { name: "src", type: "string", description: "Image URL. The fallback shows until it loads." },
      { name: "alt", type: "string", description: "The person's name." },
      { name: "fallback", type: "string", description: "Initials, one or two letters." },
      { name: "size", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "24, 32 or 40px." },
    ],
  },
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
    motion: "Press scales to 0.97 over 150ms. Dropped under reduced motion.",
    usage: `import { Button } from "@/components/ui/button"

<Button>Save changes</Button>`,
    examples: [
      { name: "button-variants", title: "Variants", description: "One primary per view. Danger only for destructive actions." },
      { name: "button-sizes", title: "Sizes", description: "32px by default, 28 in dense rows, 40 for touch." },
      { name: "button-with-icon", title: "With icon" },
      { name: "button-disabled", title: "Disabled", description: "focusableWhenDisabled keeps it in the tab order, for a disabled action that needs a tooltip." },
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
    slug: "collapsible",
    name: "Collapsible",
    description: "Shows and hides a section in place.",
    base: baseUi("collapsible", "Collapsible"),
    demo: "collapsible-demo",
    usage: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Summary</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`,
    examples: [
      { name: "collapsible-expand", title: "Expand", description: "For a panel that pushes the page down, like filters under a toolbar. The height animates with the fade." },
    ],
    motion: "By default it opens at once and the content fades in over 150ms and out over 112ms; rows in a list should not slide. With expand, the height animates too, over 200ms in and 150ms out, clipping only while it moves. Reduced motion keeps the fade. The chevron turns 90 degrees.",
    props: [
      { name: "expand", type: "boolean", default: "false", description: "On CollapsibleContent: animate the height as well as the fade." },
      { name: "open", type: "boolean", description: "Controlled state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when it opens or closes." },
      { name: "defaultOpen", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
    ],
  },
  {
    slug: "combobox",
    name: "Combobox",
    description: "A text field that filters a list and picks one item.",
    base: baseUi("combobox", "Combobox"),
    demo: "combobox-demo",
    usage: `import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem } from "@/components/ui/combobox"

<Combobox items={members}>
  <ComboboxInput placeholder="Filter by sponsor" />
  <ComboboxContent>
    {(name) => <ComboboxItem key={name} value={name}>{name}</ComboboxItem>}
  </ComboboxContent>
</Combobox>`,
    examples: [],
    motion: "The list opens in 200ms from 0.95 at the field and closes in 150ms. Reduced motion: fade only.",
    props: [
      { name: "items", type: "T[]", description: "Everything that can be picked. Filtering is built in." },
      { name: "value", type: "T | null", description: "Controlled selection." },
      { name: "onValueChange", type: "(value: T | null) => void", description: "Called with the new selection." },
      { name: "ComboboxContent empty", type: "string", default: `"No results."`, description: "Shown when nothing matches." },
    ],
  },
  {
    slug: "dialog",
    name: "Dialog",
    description: "A modal window for a decision that interrupts the flow.",
    base: baseUi("dialog", "Dialog"),
    demo: "dialog-demo",
    motion: "Opens in 300ms from 0.96 with the backdrop fading; closes in 225ms. Reduced motion: fade only.",
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
    examples: [
      { name: "input-with-button", title: "With button" },
      { name: "input-states", title: "Disabled and invalid", description: "aria-invalid draws the danger ring." },
      { name: "input-underline", title: "Underline", description: "A bare line that darkens on focus, for dense toolbars." },
    ],
    props: [
      { name: "variant", type: `"box" | "underline"`, default: `"box"`, description: "Bordered field, or a line under the text." },
      { name: "…props", type: `ComponentProps<"input">`, description: "Any input attribute. aria-invalid shows the error ring." },
    ],
  },
  {
    slug: "input-group",
    name: "Input group",
    description: "An input with a leading icon and an optional trailing hint or action.",
    demo: "input-group-demo",
    usage: `import { Input } from "@/components/ui/input"
import { InputGroup } from "@/components/ui/input-group"

<InputGroup icon={<Search />}>
  <Input placeholder="Search bills" />
</InputGroup>`,
    examples: [],
    props: [
      { name: "icon", type: "ReactNode", description: "Leading icon, 16px, tertiary." },
      { name: "trailing", type: "ReactNode", description: "A Kbd hint or a small button." },
      { name: "children", type: "Input", description: "The input; its padding makes room for both." },
    ],
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
    motion: "Opens in 200ms from 0.95 at the trigger; closes in 150ms. Reduced motion: fade only.",
    usage: `import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu"

<Menu>
  <MenuTrigger>Options</MenuTrigger>
  <MenuContent>
    <MenuItem>Rename</MenuItem>
  </MenuContent>
</Menu>`,
    examples: [{ name: "menu-groups", title: "Groups", description: "Labels and separators for longer menus." }],
    props: [
      { name: "MenuContent align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Alignment against the trigger." },
      { name: "MenuItem variant", type: `"default" | "danger"`, default: `"default"`, description: "Danger for destructive items." },
      { name: "MenuItem onClick", type: "() => void", description: "Runs the action and closes the menu." },
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    description: "Floating content anchored to a button: filters, details, small forms.",
    base: baseUi("popover", "Popover"),
    demo: "popover-demo",
    usage: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

<Popover>
  <PopoverTrigger>Filters</PopoverTrigger>
  <PopoverContent>…</PopoverContent>
</Popover>`,
    examples: [],
    motion: "Opens in 200ms from 0.95 at the trigger; closes in 150ms. Reduced motion: fade only.",
    props: [
      { name: "PopoverContent side", type: `"top" | "bottom" | "left" | "right"`, default: `"bottom"`, description: "Where it opens." },
      { name: "PopoverContent align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Alignment against the trigger." },
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Controlled state." },
    ],
  },
  {
    slug: "segmented-control",
    name: "Segmented control",
    description: "One choice from a few options, all visible.",
    base: baseUi("radio-group", "Radio Group"),
    demo: "segmented-control-demo",
    usage: `import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControlItem value="all">All</SegmentedControlItem>
  <SegmentedControlItem value="house">House</SegmentedControlItem>
</SegmentedControl>`,
    examples: [
      { name: "segmented-control-icons", title: "Icons", description: "Icon-only items need an aria-label." },
      { name: "segmented-control-underline", title: "Underline", description: "A bare row with a line under the choice, for dense toolbars." },
    ],
    props: [
      { name: "variant", type: `"pill" | "underline"`, default: `"pill"`, description: "Sunken track, or a line under the choice." },
      { name: "value", type: "string", description: "The selected item." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called with the new value." },
      { name: "defaultValue", type: "string", description: "Initial selection when uncontrolled." },
      { name: "SegmentedControlItem value", type: "string", description: "The value this choice selects. Arrow keys move between items." },
    ],
  },
  {
    slug: "separator",
    name: "Separator",
    description: "A 1px rule between rows or items.",
    base: baseUi("separator", "Separator"),
    demo: "separator-demo",
    usage: `import { Separator } from "@/components/ui/separator"

<Separator />`,
    examples: [],
    props: [{ name: "orientation", type: `"horizontal" | "vertical"`, default: `"horizontal"`, description: "Vertical stretches to the row's height." }],
  },
  {
    slug: "sheet",
    name: "Sheet",
    description: "A panel for profiles, details and share: docked to the bottom on phones, centered on wider screens.",
    base: baseUi("drawer", "Drawer"),
    demo: "sheet-demo",
    usage: `import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetTitle>Nancy Pelosi</SheetTitle>
  </SheetContent>
</Sheet>`,
    examples: [{ name: "sheet-nested", title: "Nested", description: "A sheet opened from a sheet; the one behind steps back." }],
    motion: "Slides up in 500ms on the drawer curve (by its own height on phones, from below the screen when centered) and follows a swipe; closes in 375ms, faster after a strong swipe. Reduced motion: fade only.",
    props: [
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Controlled state." },
      { name: "modal", type: `boolean | "trap-focus"`, default: "true", description: "Traps focus and locks page scroll." },
      { name: "swipeDirection", type: `"down" | …`, default: `"down"`, description: "The direction that dismisses it." },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    description: "Turns a setting on or off, effective immediately.",
    base: baseUi("switch", "Switch"),
    demo: "switch-demo",
    motion: "Thumb slides 12px in 150ms; track color changes with it.",
    usage: `import { Switch } from "@/components/ui/switch"

<Switch defaultChecked />`,
    examples: [{ name: "switch-disabled", title: "Disabled" }],
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
    motion: "Indicator moves and resizes in 200ms with transform only. Instant under reduced motion.",
    compact: true,
    usage: `import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
  </TabsList>
  <TabsPanel value="overview">…</TabsPanel>
</Tabs>`,
    examples: [{ name: "tabs-disabled", title: "Disabled tab" }],
    props: [
      { name: "value", type: "string", description: "The active tab." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the tab changes." },
      { name: "defaultValue", type: "string", description: "Initial tab when uncontrolled." },
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    description: "A brief message confirming something happened.",
    base: baseUi("toast", "Toast"),
    demo: "toast-demo",
    usage: `import { Toaster, useToast } from "@/components/ui/toast"

// Once, near the root:
<Toaster>{children}</Toaster>

// Anywhere below it:
const toast = useToast()
toast.add({ title: "Saved", description: "…" })`,
    examples: [
      { name: "toast-pill", title: "Pill", description: "One short line, bottom center, no close button. For a status that needs no action." },
    ],
    motion: "Enters 16px from below in 200ms; leaves by fading in 150ms, or along a swipe. Stacked toasts spread out on hover.",
    props: [
      { name: "Toaster variant", type: '"card" | "pill"', default: '"card"', description: "pill shows the title alone, centered." },
      { name: "Toaster limit", type: "number", default: "3", description: "How many show at once." },
      { name: "Toaster timeout", type: "number", default: "5000", description: "Milliseconds before a toast dismisses itself." },
      { name: "toast.add", type: "({ title, description, timeout }) => id", description: "Shows a toast." },
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    description: "Labels a control that has no visible text.",
    base: baseUi("tooltip", "Tooltip"),
    demo: "tooltip-demo",
    motion: "Opens in 100ms from 0.97; closes in 75ms. Instant when moving between tooltips.",
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
