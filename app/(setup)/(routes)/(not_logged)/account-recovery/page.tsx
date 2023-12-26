'use client'

import { useEffect, useState } from 'react'

import Typrography from '@/components/ui/typography'
import TextField from '@/components/ui/text/no-hrf'
import Button from '@/components/ui/button'
import Flex from '@/components/ui/flex'

import { verifyUserEmail } from '@/actions/user'
import { useRouter } from 'next/navigation'
import { sendpasswordresetemail } from '@/lib/firebase/actions'

export default function AccountRecoveryPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleContinue = async () => {
    setSuccess(false)
    if (!email) {
      setError('Email is required')
      return
    }
    try {
      const user = await verifyUserEmail(email)
      if (!user) {
        setError('No account found with that email')
        return
      }
      await sendpasswordresetemail(user.email)
      setSuccess(true)
    } catch (err: any) {
      setError(
        (err as string) || 'Something went wrong. Please try again later.'
      )
    }
  }

  useEffect(() => {
    if (error) {
      setSuccess(false)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }, [error])

  return (
    <Flex
      $align="flex-start"
      $direction="column"
      $width="50rem"
      $gapX="1rem"
      $margin="0 auto"
      $padding="3rem 1rem"
    >
      <Typrography
        $color="triadic2"
        $text="Getting back into your Twitch account"
        $type="h2"
        $fontWeight="bold"
      />
      <Typrography
        $color="triadic2"
        $text="Tell us some information about your account."
        $type="h5"
        $fontSize="small"
      />
      <TextField
        label="Enter your email or phone number"
        name="email"
        $success={false}
        type="email"
        $response
        required
        $handleChange={(e) => setEmail(e.target.value)}
      />
      <Flex
        $align="center"
        $justify="space-between"
        $margin="2rem 0"
        $width="100%"
      >
        <Button
          $fontSize="small"
          $color="primary"
          $hoverColor="surface"
          onClick={() => {
            router.push('/')
          }}
        >
          Back to Home
        </Button>
        <Button
          $bgcolor="primary"
          $hoverColor="primary"
          $color="whiteSmoke"
          $fontSize="small"
          $fontWeight="semiBold"
          disabled={email.length < 6}
          onClick={handleContinue}
        >
          {success ? 'Resend' : 'Send me an email'}
        </Button>
      </Flex>
      {error && (
        <Typrography
          $color="error"
          $text={error}
          $type="h5"
          $fontSize="small"
        />
      )}
      {success && (
        <Typrography
          $color="success"
          $text="We have emailed you a link to reset your password. Please check your inbox."
          $type="p"
          $fontSize="small"
        />
      )}
    </Flex>
  )
}
