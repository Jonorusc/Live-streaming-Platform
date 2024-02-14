'use client'
import * as S from '../styles'

import NoSsr from '@/components/NoSsr'
import Avatar from '@/components/ui/image'
import Flex from '@/components/ui/flex'
import Button from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import Typrography from '@/components/ui/typography'

import { useModal } from '@/hooks/use-modal'
import { Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

import { CURRENTUSER, updateUserProfile } from '@/actions/user'
import { deleteFromStorage } from '@/lib/firebase/storage'
import { separateByUppercase } from '@/lib/utils/text'

const ProfilePicturePage = ({ user }: { user: CURRENTUSER }) => {
  const { onOpen } = useModal()
  const { addToast } = useToast()

  return (
    <NoSsr>
      <Typrography
        $color="triadic2"
        $text="Profile Picture"
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
      />
      <S.Section>
        <Flex $align="center" $gapY="2rem">
          <Avatar
            $url={user!.profile!.avatar}
            $size={96}
            $rounded
            alt="User's profile picture"
          />
          <Flex $align="flex-start" $direction="column" $gapX="1rem">
            <Flex $align="center" $gapY="1rem">
              <Button
                $bgcolor="surface"
                $fontSize="small"
                $fontWeight="semiBold"
                $color="triadic2"
                onClick={() => {
                  onOpen('profile-image', user)
                }}
              >
                Upload Profile Picture
              </Button>
              {!user.profile?.avatar.includes('dicebear') && (
                <ToolTip
                  $arrow
                  $position="right"
                  $content={
                    <Typrography
                      $type="span"
                      $fontSize="xsmall"
                      $color="background"
                      $width="max-content"
                    >
                      <h5>Click to remove profile picture</h5>
                    </Typrography>
                  }
                >
                  <Button
                    aria-label="remove profile picture"
                    $bgcolor="transparent"
                    $fontSize="xsmall"
                    $fontWeight="semiBold"
                    $color="triadic2"
                    $padding="xsmall"
                    onClick={() => {
                      onOpen('dialog', {
                        title: 'Remove Profile Picture',
                        message:
                          'Are you sure you want to remove your profile picture?',
                        onAccept: async () => {
                          if (!user.profile) return
                          try {
                            await deleteFromStorage([user.profile.avatar])
                            // this is a server side call (server action)
                            const initals = separateByUppercase(user.username)
                            await updateUserProfile({
                              username: user.username,
                              key: 'avatar',
                              value: `https://api.dicebear.com/7.x/initials/png?seed=${initals}`
                            })

                            addToast({
                              id: Date.now(),
                              timeout: 5000,
                              type: 'success',
                              position: 'top-right',
                              data: {
                                message: 'Profile picture removed successfully.'
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
                    <Trash2 size={19} />
                  </Button>
                </ToolTip>
              )}
            </Flex>
            <Typrography
              $type="span"
              $fontSize="xsmall"
              $color="triadic2"
              $text="Must be JPEG, PNG and cannot exceed 10MB."
            />
          </Flex>
        </Flex>
      </S.Section>
    </NoSsr>
  )
}

export default ProfilePicturePage
