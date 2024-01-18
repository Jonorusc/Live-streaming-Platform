'use client'
import * as S from '../styles'

import Typrography from '@/components/ui/typography'
import { CURRENTUSER } from '@/actions/user'
import Flex from '@/components/ui/flex'
import Button from '@/components/ui/button'
import ReactLoading from 'react-loading'

import { sendpasswordresetemail } from '@/lib/firebase/actions'
import { useState, useTransition, useEffect } from 'react'
import { emailMask } from '@/utils/masks'
import { Responses } from '@/components/ui/logos/svg'

const UserSecurityPage = ({
  user,
  showMask
}: {
  user: CURRENTUSER
  showMask: boolean
  setShowMask?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }, [error])

  const onSendResetPasswordLink = () => {
    startTransition(async () => {
      try {
        await sendpasswordresetemail(user.email)
        setSuccess(true)
      } catch {
        setError(
          'Something went wrong when sending you the reset password link. Please try again later.'
        )
      }
    })
  }
  return (
    <>
      <Typrography
        $color="triadic2"
        $text="Security"
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
      />
      <Typrography
        $color="grey"
        $text="Keep your account safe and sound"
        $type="span"
        $fontSize="xsmall"
        $fontWeight="light"
        $margin="0.4rem 0"
      />
      <S.Section>
        <Flex $direction="column" $gapX="2rem">
          <Typrography
            $text="Click on the button to send a reset password link to your email"
            $color="triadic2"
            $type="p"
            $fontSize="small"
          />
          <Button
            $bgcolor={error ? 'error' : success ? 'success' : 'primary'}
            $hoverColor={error ? 'error' : success ? 'success' : 'primary'}
            $color={success ? 'dark' : 'whiteSmoke'}
            $fontSize="small"
            $width="max-content"
            disabled={pending}
            onClick={onSendResetPasswordLink}
          >
            {pending ? (
              <Flex $align="center" $justify="center" $gapY="0.3rem">
                <ReactLoading
                  type="spin"
                  color="#B4BDc7"
                  height={16}
                  width={16}
                />
              </Flex>
            ) : (
              <>
                {success
                  ? 'Resend reset password link'
                  : 'Send reset password links'}
              </>
            )}
          </Button>
        </Flex>
        {error && (
          <Flex $align="center" $gapY="0.5rem" $margin="0.5rem 0">
            <Responses $type="fail" />
            <Typrography
              $text={error}
              $color="error"
              $type="p"
              $fontSize="xsmall"
            />
          </Flex>
        )}
        {success && (
          <Flex $align="center" $gapY="0.5rem" $margin="0.5rem 0">
            <Responses $type="success" />
            <Typrography
              $text={`We have been sent you a reset password link to your email: ${
                showMask ? emailMask(user.email) : user.email
              }`}
              $color="success"
              $type="p"
              $fontSize="xsmall"
            />
          </Flex>
        )}
      </S.Section>
    </>
  )
}
export default UserSecurityPage
