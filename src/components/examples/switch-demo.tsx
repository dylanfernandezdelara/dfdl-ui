import { Switch } from "@/components/ui/switch"

export default function SwitchDemo() {
  return (
    <label className="flex items-center gap-minor text-ui text-fg">
      <Switch defaultChecked />
      Email notifications
    </label>
  )
}
