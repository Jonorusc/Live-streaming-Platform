'use client'

import { redirect } from 'next/navigation'
import { app_config } from '@/utils/firebase'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user'
import ReactLoading from 'react-loading'
import Grid from '@/components/ui/grid'
import { useModal } from '@/hooks/use-modal'

import { verifyEmail } from './verify-email'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const actionCode = searchParams.get('oobCode')
  const mode = searchParams.get('mode')
  const apiKey = searchParams.get('apiKey')
  const fetched = useRef(false)
  const { addToast } = useToast()
  const { userMutate } = useUser()
  const { onOpen } = useModal()

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

  useEffect(() => {
    // checking if api key is valid (prevent spamming)
    try {
      if (apiKey !== app_config.apiKey) {
        if (fetched.current) return
        fetched.current = true
        notify('error', 'Something went wrong. Please try again later.')
        redirect('/')
      }

      // checking if there is an action code
      if (!actionCode) {
        if (fetched.current) return
        fetched.current = true
        notify(
          'error',
          'It looks like your email verification link is invalid or expired. Please try requesting a new one.'
        )
        redirect('/')
      }

      if (fetched.current) return
      fetched.current = true

      switch (mode) {
        case 'verifyEmail':
          {
            verifyEmail(actionCode)
              .then(() => {
                notify('success', 'Your email has been verified.')
                userMutate()
              })
              .catch((error) => {
                notify('error', error)
              })
              .finally(() => {
                redirect('/')
              })
          }
          break
        case 'resetPassword':
          onOpen('forgot-password', { actionCode })
          break
        default:
          notify('error', 'Something went wrong. Please try again later.')
          redirect('/')
      }
    } catch {
      if (fetched.current) return
      fetched.current = true
      notify(
        'error',
        'Something went wrong with your verification link. Please try again later.'
      )
      redirect('/')
    }
  }, [fetched])

  return (
    <Grid $height="100vh" $width="100vw" $placeItems="center">
      <ReactLoading type="spin" color="#B4BDc7" height={100} width={100} />
    </Grid>
  )
}
