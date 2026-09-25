import { Switch } from "@/components/ui/switch"

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-minor">
      <label className="flex items-center gap-minor text-ui text-fg-secondary">
        <Switch disabled />
        Off, disabled
      </label>
      <label className="flex items-center gap-minor text-ui text-fg-secondary">
        <Switch defaultChecked disabled />
        On, disabled
      </label>
    </div>
  )
}
