import type { ComponentType } from "react"

import BadgeDemo from "./badge-demo"
import SegmentedControlUnderline from "./segmented-control-underline"
import InputUnderline from "./input-underline"
import AvatarDemo from "./avatar-demo"
import CollapsibleDemo from "./collapsible-demo"
import ComboboxDemo from "./combobox-demo"
import InputGroupDemo from "./input-group-demo"
import PopoverDemo from "./popover-demo"
import SeparatorDemo from "./separator-demo"
import SheetDemo from "./sheet-demo"
import SheetNested from "./sheet-nested"
import ToastDemo from "./toast-demo"
import ButtonDisabled from "./button-disabled"
import InputStates from "./input-states"
import SwitchDisabled from "./switch-disabled"
import SegmentedControlIcons from "./segmented-control-icons"
import TabsDisabled from "./tabs-disabled"
import MenuGroups from "./menu-groups"
import ButtonDemo from "./button-demo"
import ButtonSizes from "./button-sizes"
import ButtonVariants from "./button-variants"
import ButtonWithIcon from "./button-with-icon"
import CardDemo from "./card-demo"
import DialogDemo from "./dialog-demo"
import InputDemo from "./input-demo"
import InputWithButton from "./input-with-button"
import KbdDemo from "./kbd-demo"
import MenuDemo from "./menu-demo"
import SegmentedControlDemo from "./segmented-control-demo"
import SwitchDemo from "./switch-demo"
import TabsDemo from "./tabs-demo"
import TooltipDemo from "./tooltip-demo"

/** Example name (file name) to component. The source shown beside each is read from the same file at build. */
export const EXAMPLES: Record<string, ComponentType> = {
  "segmented-control-underline": SegmentedControlUnderline,
  "input-underline": InputUnderline,
  "avatar-demo": AvatarDemo,
  "collapsible-demo": CollapsibleDemo,
  "combobox-demo": ComboboxDemo,
  "input-group-demo": InputGroupDemo,
  "popover-demo": PopoverDemo,
  "separator-demo": SeparatorDemo,
  "sheet-demo": SheetDemo,
  "sheet-nested": SheetNested,
  "toast-demo": ToastDemo,
  "button-disabled": ButtonDisabled,
  "input-states": InputStates,
  "switch-disabled": SwitchDisabled,
  "segmented-control-icons": SegmentedControlIcons,
  "tabs-disabled": TabsDisabled,
  "menu-groups": MenuGroups,
  "badge-demo": BadgeDemo,
  "button-demo": ButtonDemo,
  "button-sizes": ButtonSizes,
  "button-variants": ButtonVariants,
  "button-with-icon": ButtonWithIcon,
  "card-demo": CardDemo,
  "dialog-demo": DialogDemo,
  "input-demo": InputDemo,
  "input-with-button": InputWithButton,
  "kbd-demo": KbdDemo,
  "menu-demo": MenuDemo,
  "segmented-control-demo": SegmentedControlDemo,
  "switch-demo": SwitchDemo,
  "tabs-demo": TabsDemo,
  "tooltip-demo": TooltipDemo,
}
