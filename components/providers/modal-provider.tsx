'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import SignUpModal from '@/components/modals/sign-up'
import SignInModal from '@/components/modals/sign-in'
import ProfileImageModal from '@/components/modals/profile-image'
import DialogModal from '@/components/modals/dialog'

import { useModal } from '@/hooks/use-modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { isOpen, type } = useModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const modals = {
    signup: <SignUpModal />,
    signin: <SignInModal />,
    'profile-image': <ProfileImageModal />,
    dialog: <DialogModal />
  }

  const ModalComponent: JSX.Element = modals[type!]

  return (
    <>
      <AnimatePresence>
        {isOpen && ModalComponent && (ModalComponent as JSX.Element)}
      </AnimatePresence>
    </>
  )
}
