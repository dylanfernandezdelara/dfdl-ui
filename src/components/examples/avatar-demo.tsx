import { Avatar } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-minor">
      <Avatar size="sm" alt="Alexandria Ocasio-Cortez" fallback="AO" />
      <Avatar alt="Mitch McConnell" fallback="MM" />
      <Avatar size="lg" alt="Nancy Pelosi" fallback="NP" />
    </div>
  )
}
