import { COMPONENTS } from "@/content/components"
import { GITHUB_URL } from "@/lib/site"

export type NavItem = { href: string; label: string }
export type NavGroup = { label: string; items: NavItem[] }

/** Single source for the sidebar, the overview page and llms.txt. */
export const NAV: NavGroup[] = [
  {
    label: "Getting started",
    items: [
      { href: "/", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/guide", label: "Guidelines" },
      { href: "/llms.txt", label: "llms.txt" },
    ],
  },
  {
    label: "Foundations",
    items: [
      { href: "/foundations/color", label: "Color" },
      { href: "/foundations/type", label: "Typography" },
      { href: "/foundations/shape", label: "Shape and spacing" },
      { href: "/foundations/motion", label: "Motion" },
    ],
  },
  {
    label: "Components",
    items: COMPONENTS.map((c) => ({ href: `/components/${c.slug}`, label: c.name })),
  },
  {
    label: "Resources",
    items: [
      { href: "/lab", label: "Labs" },
      { href: `${GITHUB_URL}/blob/main/decisions.md`, label: "Decisions" },
      { href: GITHUB_URL, label: "GitHub" },
    ],
  },
]
