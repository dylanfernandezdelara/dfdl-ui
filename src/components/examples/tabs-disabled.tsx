import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="votes">Votes</TabsTab>
        <TabsTab value="amendments" disabled>
          Amendments
        </TabsTab>
      </TabsList>
      <TabsPanel value="overview">Introduced in the House on March 4.</TabsPanel>
      <TabsPanel value="votes">Passed 218 to 210.</TabsPanel>
    </Tabs>
  )
}
