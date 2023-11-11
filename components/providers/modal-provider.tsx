'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import SignUpModal from '@/components/modals/sign-up'
import SignInModal from '@/components/modals/sign-in'

import { useModal } from '@/hooks/use-modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { isOpen, type } = useModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && type === 'signup' && <SignUpModal />}
      {isOpen && type === 'signin' && <SignInModal />}
    </AnimatePresence>
  )
}
