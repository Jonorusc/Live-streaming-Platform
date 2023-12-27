'use client'
import * as S from '../styles'

import NoSsr from '@/components/NoSsr'
import Flex from '@/components/ui/flex'
import Button from '@/components/ui/button'
import Typrography from '@/components/ui/typography'
import ReactLoading from 'react-loading'

import { useModal } from '@/hooks/use-modal'
import { useToast } from '@/hooks/use-toast'
import { useFormStatus } from 'react-dom'

import { CURRENTUSER, signOutUser, updateUser } from '@/actions/user'

const DeactivateAccountPage = ({ user }: { user: CURRENTUSER }) => {
  const { onOpen } = useModal()
  const { addToast } = useToast()
  const server = useFormStatus()
  return (
    <NoSsr>
      <Typrography
        $color="triadic2"
        $text="Disabling Your Twitch Clone Account"
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
      />
      <Typrography
        $color="grey"
        $text="Completely deactivate your account"
        $type="span"
        $fontSize="xsmall"
        $fontWeight="light"
        $margin="0.5rem 0"
      />
      <S.Section>
        <Flex $align="flex-start" $gapY="2rem">
          <Typrography
            $color="grey"
            $fontSize="xsmall"
            $fontWeight="light"
            $margin="0 0 8rem 0"
          >
            <p>
              If you deactivate your account, your profile will be hidden and
              you will no longer be able to do things like talk to people or
              stream on Twitch Clone. <br />
              <br />
              You can reactivate your account anytime by logging in.
            </p>
          </Typrography>
          <Flex
            $justify="flex-end"
            $background="surface"
            $width="100%"
            $padding="2rem"
            aria-label="section-footer"
          >
            <Button
              $bgcolor="darkGrey"
              $color="grey"
              $fontSize="small"
              $fontWeight="semiBold"
              onClick={() => {
                onOpen('dialog', {
                  title: 'Deactivate Account',
                  message:
                    'Are you sure you want to deactivate your account? You will no longer be able to use Twitch Clone.',
                  acceptText: 'Deactivate',
                  onAccept: async () => {
                    try {
                      await updateUser({
                        username: user.username,
                        value: {
                          deactivated: true
                        }
                      })

                      await signOutUser()

                      addToast({
                        id: Date.now(),
                        timeout: 5000,
                        type: 'success',
                        position: 'top-right',
                        data: {
                          message: 'Your account has been deactivated.'
                        }
                      })
                    } catch {
                      addToast({
                        id: Date.now(),
                        timeout: 5000,
                        type: 'error',
                        position: 'top-right',
                        data: {
                          message:
                            'Something went wrong. Please try again later.'
                        }
                      })
                    }
                  }
                })
              }}
            >
              {server.pending ? (
                <Flex $align="center" $justify="center" $gapY="0.3rem">
                  <ReactLoading
                    type="spin"
                    color="#B4BDc7"
                    height={16}
                    width={16}
                  />
                  <span>Saving...</span>
                </Flex>
              ) : (
                <>Deactivate my account</>
              )}
            </Button>
          </Flex>
        </Flex>
      </S.Section>
    </NoSsr>
  )
}

export default DeactivateAccountPage
