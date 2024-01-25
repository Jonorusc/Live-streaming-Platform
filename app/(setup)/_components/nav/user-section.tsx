'use client'

import * as S from './styles'

import Flex from '@/components/ui/flex'
import Button from '@/components/ui/button'
import { Dropdown } from './dropdown-menu'

import { CURRENTUSER } from '@/actions/user'
import { useModal } from '@/hooks/use-modal'

import React from 'react'

export const UserSection = ({ user }: { user: CURRENTUSER | null }) => {
  const { onClose, onOpen } = useModal()

  return (
    <>
      <Flex
        $align="center"
        $gapY="1rem"
        $padding="0 0.5rem 0 0"
        $justify="flex-end"
        $width="max-content!important"
      >
        {/* sign in/up */}
        {!user && (
          <>
            <Button
              $bgcolor="triadic1"
              $color="triadic2"
              $fontSize="small"
              $fontWeight="bold"
              onClick={() => {
                onClose()
                onOpen('signin')
              }}
            >
              Log In
            </Button>
            <Button
              $bgcolor="primary"
              $hoverColor="primary"
              $color="whiteSmoke"
              $fontSize="small"
              $fontWeight="bold"
              onClick={() => {
                onClose()
                onOpen('signup')
              }}
            >
              Sign Up
            </Button>
          </>
        )}
        {/* notifications and more*/}

        {/* dropdown */}
        <Dropdown user={user} />
      </Flex>
    </>
  )
}
