export type NavItem = { href: string; label: string; status?: "soon" }
export type NavGroup = { label: string; items: NavItem[] }

/** Single source for the sidebar, the overview page and llms.txt. */
export const NAV: NavGroup[] = [
  {
    label: "Start",
    items: [
      { href: "/", label: "Overview" },
      { href: "/guide", label: "Guide" },
      { href: "/llms.txt", label: "llms.txt" },
    ],
  },
  {
    label: "Foundations",
    items: [
      { href: "/foundations/color", label: "Color" },
      { href: "/foundations/type", label: "Type" },
      { href: "/foundations/shape", label: "Shape and rhythm" },
      { href: "/foundations/motion", label: "Motion" },
    ],
  },
  {
    label: "Components",
    items: [
      { href: "/components/button", label: "Button", status: "soon" },
      { href: "/components/segmented", label: "Segmented control", status: "soon" },
      { href: "/components/row", label: "Data row", status: "soon" },
      { href: "/components/card", label: "Card", status: "soon" },
      { href: "/components/tabs", label: "Tabs", status: "soon" },
      { href: "/components/menu", label: "Menu", status: "soon" },
      { href: "/components/dialog", label: "Dialog", status: "soon" },
      { href: "/components/drawer", label: "Drawer", status: "soon" },
    ],
  },
  {
    label: "Process",
    items: [
      { href: "/lab", label: "Labs" },
      { href: "https://github.com/dylanfernandezdelara/dfdl-ui/blob/main/decisions.md", label: "Decisions" },
      { href: "https://github.com/dylanfernandezdelara/dfdl-ui", label: "Source" },
    ],
  },
]
