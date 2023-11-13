'use client'

import { useRouter, redirect } from 'next/navigation'
import { app_config } from '@/utils/firebase'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user'
import { getCurrentUser } from '@/lib/firebase/auth'
import { handleverifyemail } from '@/lib/firebase/actions'
import { updateUserEmailStatus } from '@/actions/user'
import ReactLoading from 'react-loading'
import Grid from '@/components/ui/grid'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const actionCode = searchParams.get('oobCode')
  const apiKey = searchParams.get('apiKey')
  const fetched = useRef(false)
  const { addToast } = useToast()
  const router = useRouter()
  const { userMutate } = useUser()

  const notify = (type: 'error' | 'success', message: string) => {
    addToast({
      id: Date.now(),
      timeout: 8000,
      type: type,
      position: 'top-right',
      data: {
        title: 'Email verification',
        message: message
      }
    })
  }

  useEffect(() => {
    // checking if api key is valid (prevent spamming)
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

    const verifyEmail = async () => {
      // try to verify email
      const firebaseUser = await getCurrentUser()
      if (!firebaseUser || !firebaseUser.email) {
        notify('error', 'You need to be logged in to verify your email.')
        router.push('/')
        return
      }

      try {
        // inside of handleverifyemail (firebase), we will check if the user is already logged in or not and check the action code as well
        const { success } = await handleverifyemail(actionCode)

        if (success) {
          // I'm using two methods to update the user's email status because at some point if I decide to switch to another authentication platform I can easily change the code
          const handler: any = await updateUserEmailStatus(firebaseUser.email)
          if (handler.error) {
            notify('error', 'Something went wrong. Please try again later.')
            return
          }
        }

        notify('success', 'Your email has been verified successfully.')
        userMutate()
      } catch (resp: any) {
        notify('error', resp.error?.message)
      } finally {
        router.push('/')
      }
    }

    if (fetched.current) return
    fetched.current = true

    verifyEmail()
  }, [fetched])

  return (
    <Grid $height="100vh" $width="100vw" $placeItems="center">
      <ReactLoading type="spin" color="#B4BDc7" height={150} width={150} />
    </Grid>
  )
}
