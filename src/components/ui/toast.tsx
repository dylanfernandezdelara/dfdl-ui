"use client"

import { Toast as BaseToast } from "@base-ui/react/toast"
import { X } from "lucide-react"
import type { ReactNode } from "react"

/**
 * Toasts. Put <Toaster> once near the root; call useToast().add({ title, description }) anywhere under it.
 * Bottom right on wide screens, bottom center on narrow ones. Swipe right or down to dismiss; F6 reaches them by keyboard.
 */
function Toaster({ children, limit = 3, timeout = 5000 }: { children: ReactNode; limit?: number; timeout?: number }) {
  return (
    <BaseToast.Provider limit={limit} timeout={timeout}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="fixed right-4 bottom-4 left-4 z-50 sm:right-major sm:bottom-major sm:left-auto sm:w-toast">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  )
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager()
  return toasts.map((toast) => (
    <BaseToast.Root key={toast.id} toast={toast} swipeDirection={["right", "down"]} data-slot="toast" className="toast-root rounded-md bg-raised elevation-floating outline-none">
      <BaseToast.Content className="toast-content flex items-start gap-minor p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <BaseToast.Title className="text-ui font-medium text-fg-strong" />
          <BaseToast.Description className="text-ui text-fg-secondary" />
        </div>
        <BaseToast.Close aria-label="Dismiss" className="-mt-1 -mr-1 flex size-7 shrink-0 items-center justify-center rounded-sm text-fg-tertiary transition-interactive duration-fast ease-out hover:bg-surface-hover hover:text-fg-strong">
          <X className="size-4" strokeWidth={1.5} aria-hidden />
        </BaseToast.Close>
      </BaseToast.Content>
    </BaseToast.Root>
  ))
}

const useToast = BaseToast.useToastManager

export { Toaster, useToast }
