"use client"

import type { ReactNode } from "react"

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

export function PreviewTabs({ children, code }: { children: ReactNode; code: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg hairline">
      <Tabs defaultValue="preview">
        <div className="px-2">
          <TabsList>
            <TabsTab value="preview">Preview</TabsTab>
            <TabsTab value="code">Code</TabsTab>
          </TabsList>
        </div>
        <TabsPanel value="preview">
          {/* Demos of any height are centered here, so the frame's interior is exempt from the page grid audit. */}
          <div data-product-type data-grid-ignore className="flex min-h-60 items-center justify-center px-12 pb-12">
            {children}
          </div>
        </TabsPanel>
        <TabsPanel value="code">{code}</TabsPanel>
      </Tabs>
    </div>
  )
}
