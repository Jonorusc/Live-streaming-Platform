'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useToast } from '@/hooks/use-toast'
import Toast from '@/components/ui/toast'
import { ToastContainer } from '@/components/ui/toast/styles'

export const ToastProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { toasts, show } = useToast()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {show && (
        <>
          <ToastContainer $position="top-right">
            <AnimatePresence>
              {toasts
                .filter((toast) => toast.position === 'top-right')
                .sort(
                  (a, b) =>
                    ((b.timerId as number) || 0) - ((a.timerId as number) || 0)
                )
                .map((mapToast) => (
                  <Toast key={mapToast.id} toast={mapToast} />
                ))}
            </AnimatePresence>
          </ToastContainer>
          <ToastContainer $position="top-left">
            <AnimatePresence>
              {toasts
                .filter((toast) => toast.position === 'top-left')
                .sort(
                  (a, b) =>
                    ((b.timerId as number) || 0) - ((a.timerId as number) || 0)
                )
                .map((mapToast) => (
                  <Toast key={mapToast.id} toast={mapToast} />
                ))}
            </AnimatePresence>
          </ToastContainer>
          <ToastContainer $position="bottom-right">
            <AnimatePresence>
              {toasts
                .filter((toast) => toast.position === 'bottom-right')
                .sort(
                  (a, b) =>
                    ((b.timerId as number) || 0) - ((a.timerId as number) || 0)
                )
                .map((mapToast) => (
                  <Toast key={mapToast.id} toast={mapToast} />
                ))}
            </AnimatePresence>
          </ToastContainer>
          <ToastContainer $position="bottom-left">
            <AnimatePresence>
              {toasts
                .filter((toast) => toast.position === 'bottom-left')
                .sort(
                  (a, b) =>
                    ((b.timerId as number) || 0) - ((a.timerId as number) || 0)
                )
                .map((mapToast) => (
                  <Toast key={mapToast.id} toast={mapToast} />
                ))}
            </AnimatePresence>
          </ToastContainer>
        </>
      )}
    </>
  )
}
