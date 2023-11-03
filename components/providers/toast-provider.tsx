'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useToast } from '@/hooks/use-toast'

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
    <AnimatePresence>
      {/* {show && toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} position={toast.position} />
      ))} */}
    </AnimatePresence>
  )
}
