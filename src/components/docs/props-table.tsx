import type { Prop } from "@/content/components"

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="overflow-x-auto rounded-md hairline">
      <table className="w-full text-left text-ui">
        <thead>
          <tr className="hairline-b">
            <th className="h-10 px-4 font-medium text-fg-strong">Prop</th>
            <th className="h-10 px-4 font-medium text-fg-strong">Type</th>
            <th className="h-10 px-4 font-medium text-fg-strong">Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="align-top hairline-b last:shadow-none">
              <td className="px-4 py-2">
                <code className="font-mono text-caption text-fg-strong">{p.name}</code>
                <p className="mt-1 text-caption text-fg-secondary">{p.description}</p>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-caption text-fg-secondary">{p.type}</code>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-caption text-fg-secondary">{p.default ?? "—"}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
