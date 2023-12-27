'use client'
import * as S from '../styles'

import Typrography from '@/components/ui/typography'
import { CURRENTUSER } from '@/actions/user'
import Flex from '@/components/ui/flex'
import Button from '@/components/ui/button'
import ReactLoading from 'react-loading'

import { sendemailverification } from '@/lib/firebase/actions'
import { useState, useTransition, useEffect } from 'react'
import { emailMask } from '@/utils/masks'
import { Eye, EyeOff, Pencil } from 'lucide-react'

import EditUserEmail from './edit-email'
import { Responses } from '@/components/ui/logos/svg'

const UserContactPage = ({
  user,
  showMask,
  setShowMask
}: {
  user: CURRENTUSER
  showMask: boolean
  setShowMask: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }, [error])

  const setMask = (state: boolean) => {
    if (user.email_verified) setShowMask(state)
  }

  return (
    <>
      <Typrography
        $color="triadic2"
        $text="Contact"
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
      />
      <Typrography
        $color="grey"
        $text="Where we send important messages about your account"
        $type="span"
        $fontSize="xsmall"
        $fontWeight="light"
        $margin="0.4rem 0"
      />
      <S.Section>
        <Flex $flow="row wrap" $gapY="10vw">
          <Flex $align="flex-start" $justify="flex-start">
            <Typrography
              $color="triadic2"
              $text="Email"
              $type="span"
              $fontSize="xsmall"
              $fontWeight="semiBold"
              $margin="0.4rem 0"
            />
          </Flex>
          <Flex
            $align="flex-start"
            $direction="column"
            $width="calc(100% - 13vw)"
          >
            {!edit ? (
              <>
                <Flex
                  $align="center"
                  $flow="row wrap"
                  $width="100%"
                  $justify="space-between"
                >
                  <Typrography
                    $color="triadic2"
                    $text={showMask ? emailMask(user.email) : user.email}
                    $type="span"
                    $fontSize="medium"
                    $fontWeight="semiBold"
                    $margin="0.4rem 0"
                  />
                  <Flex $gapY="1rem">
                    {!showMask && user.email_verified && (
                      <EyeOff
                        aria-label="btn-actions"
                        onClick={() => {
                          setMask(true)
                        }}
                      />
                    )}
                    {showMask && user.email_verified && (
                      <Eye
                        aria-label="btn-actions"
                        onClick={() => {
                          setMask(false)
                        }}
                      />
                    )}
                    <Pencil
                      aria-label="btn-actions"
                      onClick={() => {
                        setEdit(true)
                      }}
                    />
                  </Flex>
                </Flex>
                {user.email_verified ? (
                  <Typrography
                    $color="grey"
                    $type="span"
                    $fontSize="xsmall"
                    $fontWeight="light"
                    $margin="1.5rem 0 1rem 0"
                  >
                    <p>
                      <strong>Verified</strong>. Thank you for verifying your
                      email.
                    </p>
                  </Typrography>
                ) : (
                  <>
                    <Flex
                      $direction="column"
                      $align="flex-start"
                      $gapX="0.5rem"
                      $margin="1.5rem 0 1rem 0"
                    >
                      <p>
                        <strong>Unverified</strong>. Please verify your email to
                        unlock all features of Twitch Clone.
                      </p>
                      <Button
                        $color={success ? 'success' : 'primary'}
                        $fontSize="xsmall"
                        $bgcolor="surface"
                        $hoverColor="darkGrey"
                        $fontWeight="semiBold"
                        onClick={() => {
                          startTransition(async () => {
                            await sendemailverification()
                              .then(() => {
                                setSuccess(true)
                              })
                              .catch(() => {
                                setError(
                                  'Something went wrong when sending email. Try again later.'
                                )
                              })
                          })
                        }}
                      >
                        {pending ? (
                          <Flex
                            $align="center"
                            $justify="center"
                            $gapY="0.3rem"
                          >
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
                              ? 'Resend email verification link'
                              : 'Send me a verification link'}
                          </>
                        )}
                      </Button>
                    </Flex>
                  </>
                )}

                <Typrography
                  $color="grey"
                  $type="span"
                  $text="This email is linked to your account."
                  $fontSize="xsmall"
                  $fontWeight="light"
                />
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
              </>
            ) : (
              <EditUserEmail user={user} setEdit={setEdit} />
            )}
          </Flex>
        </Flex>
      </S.Section>
    </>
  )
}
export default UserContactPage
