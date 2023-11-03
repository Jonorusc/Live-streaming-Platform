import { create } from 'zustand'

type MESSAGE = TemplateStringsArray | Record<string, any> | string
type POSITION = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface Toast {
  id: number
  message: MESSAGE
  type: 'success' | 'error' | 'warning' | 'info'
  position: POSITION
  timeout: number
  data?: any
}

export type ToastProps = {
  toasts: Toast[]
  show: boolean
  addToast: (toast: Toast) => void
  removeToast: (id: number) => void
}

export const useToast = create<ToastProps>((set, get) => ({
  toasts: [],
  show: false,
  addToast: (toast) => {
    set((state) => ({ toasts: [...state.toasts, toast], show: true }))

    setTimeout(() => {
      get().removeToast(toast.id)
    }, toast.timeout)
  },
  removeToast: (id) => {
    set((state) => {
      const newToasts = state.toasts.filter((t) => t.id !== id)
      return { toasts: newToasts, show: newToasts.length > 0 }
    })
  }
}))
