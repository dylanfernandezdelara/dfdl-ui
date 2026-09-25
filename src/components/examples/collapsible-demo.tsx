import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function CollapsibleDemo() {
  return (
    <Collapsible className="w-full max-w-md">
      <CollapsibleTrigger>Summary</CollapsibleTrigger>
      <CollapsibleContent>
        <p className="px-2 pt-minor text-body text-fg-secondary">
          Extends the SNAP work requirement pilot through 2027 and funds state reporting systems.
        </p>
      </CollapsibleContent>
    </Collapsible>
  )
}
