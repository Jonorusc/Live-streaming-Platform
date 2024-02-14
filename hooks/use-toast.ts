import { create } from 'zustand'
import PlaySound from '@/lib/utils/play-sound'

export type POSITION = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export type TYPE = 'success' | 'error' | 'warning' | 'info' | 'islive'
export interface ToastData {
  profile?: {
    picture: string
    name: string
  }
  redirect?: string
  title?: string
  message: string
}

export type Toast = {
  id: number
  type: TYPE
  position: POSITION
  timeout: number
  remainingTime?: number
  startTime?: number
  data: ToastData
  sound?: boolean
  hovered?: boolean
  timerId?: NodeJS.Timeout | number
}

export type ToastProps = {
  toasts: Toast[]
  show: boolean
  addToast: (toast: Toast) => void
  removeToast: (id: number) => void
  pauseToast: (id: number) => void
  resumeToast: (id: number) => void
}

export const useToast = create<ToastProps>((set, get) => ({
  toasts: [],
  show: false,
  addToast: (toast) => {
    if (toast.sound) {
      if (toast.type === 'islive') {
        PlaySound('/sounds/live_notification.mp3')
      } else {
        PlaySound('/sounds/new_notification.mp3')
      }
    }

    toast.hovered = false
    toast.remainingTime = toast.timeout
    toast.startTime = Date.now()
    set((state) => ({ toasts: [...state.toasts, toast], show: true }))

    toast.timerId = setTimeout(() => {
      if (!toast.hovered) {
        get().removeToast(toast.id)
      }
    }, toast.timeout)
  },
  removeToast: (id: number) => {
    if (!get().toasts.length) return
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
      show: state.toasts.length > 0
    }))
  },
  pauseToast: (id: number) => {
    if (!get().toasts.length) return
    set((state) => {
      const toast = state.toasts.find((toast) => toast.id === id)
      if (toast) {
        toast.hovered = true
        if (toast.timerId) {
          clearTimeout(toast.timerId)
          if (
            toast.remainingTime !== undefined &&
            toast.startTime !== undefined
          ) {
            toast.remainingTime -= Date.now() - toast.startTime
          }
        }
      }
      return { toasts: [...state.toasts] }
    })
  },
  resumeToast: (id: number) => {
    if (!get().toasts.length) return
    set((state) => {
      const toast = state.toasts.find((toast) => toast.id === id)
      if (toast) {
        toast.hovered = false
        toast.startTime = Date.now()
        toast.timerId = setTimeout(() => {
          if (!toast.hovered) {
            get().removeToast(toast.id)
          }
        }, toast.remainingTime)
      }
      return { toasts: [...state.toasts] }
    })
  }
}))
