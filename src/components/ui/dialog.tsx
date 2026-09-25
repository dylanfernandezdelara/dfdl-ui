"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Dialog = BaseDialog.Root
const DialogTrigger = BaseDialog.Trigger
const DialogClose = BaseDialog.Close

function DialogContent({ className, ...props }: ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="motion-fade fixed inset-0 z-50 bg-overlay" />
      <BaseDialog.Popup
        data-slot="dialog"
        className={cn(
          "motion-dialog fixed top-1/2 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-major rounded-lg bg-raised p-major elevation-floating outline-none",
          className,
        )}
        {...props}
      />
    </BaseDialog.Portal>
  )
}

function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-1", className)} {...props} />
}

function DialogTitle({ className, ...props }: ComponentProps<typeof BaseDialog.Title>) {
  return <BaseDialog.Title data-slot="dialog-title" className={cn("font-heading text-heading text-fg-strong", className)} {...props} />
}

function DialogDescription({ className, ...props }: ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description data-slot="dialog-description" className={cn("text-ui text-fg-secondary", className)} {...props} />
}

function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex justify-end gap-minor", className)} {...props} />
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger }
