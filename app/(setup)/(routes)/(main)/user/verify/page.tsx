'use client'

import { redirect, useRouter } from 'next/navigation'
import { app_config } from '@/utils/firebase'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user'
import ReactLoading from 'react-loading'
import Grid from '@/components/ui/grid'
import { useModal } from '@/hooks/use-modal'

import { verifyEmail } from './verify-email'
import Flex from '@/components/ui/flex'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const actionCode = searchParams.get('oobCode')
  const mode = searchParams.get('mode')
  const apiKey = searchParams.get('apiKey')
  const fetched = useRef(false)
  const { addToast } = useToast()
  const { userMutate } = useUser()
  const { onOpen } = useModal()
  const router = useRouter()

  const notify = (type: 'error' | 'success', message: string) => {
    addToast({
      id: Date.now(),
      timeout: 8000,
      type: type,
      position: 'top-right',
      data: {
        message: message
      }
    })
  }

  async function actions(actionCode: string, mode: string) {
    switch (mode) {
      case 'verifyEmail':
        {
          await verifyEmail(actionCode)
            .then(() => {
              notify('success', 'Your email has been verified.')
              userMutate()
            })
            .catch((error) => {
              notify('error', error)
            })
            .finally(() => {
              // redirect('/')
              router.push('/')
            })
        }
        break
      case 'resetPassword':
        onOpen('forgot-password', { actionCode })
        break
      default:
        redirect('/')
        break
    }
  }

  useEffect(() => {
    if (fetched.current) return
    fetched.current = true

    // checking if api key is valid (prevent spamming)
    if (apiKey !== app_config.apiKey) {
      throw new Error('An unexpected error occurred.')
    }

    // checking if there is an action code
    if (!actionCode) {
      throw new Error(
        'It looks like your email verification link is invalid or expired. Please try requesting a new one.'
      )
    }

    if (!mode) {
      throw new Error('An unexpected error occurred.')
    }

    try {
      actions(actionCode, mode)
    } catch (error: any) {
      notify(
        'error',
        error ||
          'Something went wrong with your verification link. Please try again later.'
      )
      redirect('/')
    }
  }, [fetched])

  return (
    <Flex
      $height="100dvh"
      $width="100vw"
      $align="center"
      $direction="column"
      $justify="center"
      $gapX="0.5rem"
    >
      {mode === 'verifyEmail' && <h1>Verifying email</h1>}
      <ReactLoading type="spin" color="#B4BDc7" height={60} width={60} />
    </Flex>
  )
}
