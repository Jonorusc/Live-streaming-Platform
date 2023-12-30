'use client'
import * as S from '../styles'

import NoSsr from '@/components/NoSsr'
import Flex from '@/components/ui/flex'
import Button from '@/components/ui/button'
import Typrography from '@/components/ui/typography'
import TextField from '@/components/ui/text'
import ReactLoading from 'react-loading'

import { useToast } from '@/hooks/use-toast'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { invalidUsernames } from '@/utils/invalid-things'
import { zodResolver } from '@hookform/resolvers/zod'

import { CURRENTUSER, updateUser, verifyUserName } from '@/actions/user'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { updateChannel } from '@/actions/channel'
import { updatePathInStorage } from '@/lib/firebase/storage'

const ProfileSettingsPage = ({ user }: { user: CURRENTUSER }) => {
  const server = useFormStatus()
  const usernameUpdatedAt = user.username_updated_at
  const [canUpdateUsername, setCanUpdateUsername] = useState(false)
  const [areFieldsAble, setAreFieldsAble] = useState(false)
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    if (usernameUpdatedAt) {
      const daysSinceUpdate = Math.floor(
        (new Date().getTime() - new Date(usernameUpdatedAt).getTime()) /
          (24 * 60 * 60 * 1000) +
          0.5
        // adding 0.5 to the result before calling Math.floor effectively rounds the result to the nearest whole number. This means that if the username was updated less than 12 hours ago, daysSinceUpdate will be 0, and daysLeft will be 30. If the username was updated more than 12 hours ago, daysSinceUpdate will be 1, and daysLeft will be 29.
      )

      if (daysSinceUpdate >= 30) {
        setCanUpdateUsername(true)
      } else {
        setDaysLeft(30 - daysSinceUpdate)
      }
      return
    }
    setCanUpdateUsername(true)
  }, [usernameUpdatedAt])

  const { addToast } = useToast()

  const schema = z.object({
    username: z
      .string()
      .min(5, { message: 'Username must be at least 5 characters' })
      .max(25, { message: 'Username must be at most 25 characters' })
      .regex(/^[a-zA-Z0-9_]*$/, {
        message: 'Username cannot have spaces or special characters'
      })
      .refine(
        (username) => {
          return !invalidUsernames.includes(username)
        },
        { message: "This username isn't allowed" }
      )
      .refine(
        async (username) => {
          if (username.length < 5) return false
          try {
            if (username === user.username) return true
            const exist = await verifyUserName(username)
            if (exist) return false
            return true
          } catch {
            return true
          }
        },
        {
          message: 'This username is already taken'
        }
      )
      .refine((username) => {
        return (
          username !== user.username,
          'Username must be different from the current one'
        )
      })
      .optional(),
    bio: z
      .string()
      .min(5, { message: 'Bio must be at least 5 characters' })
      .max(300, { message: 'Bio must be at most 300 characters' })
      .refine((bio) => {
        return (
          bio !== user.channel?.description,
          'Bio must be different from the current one'
        )
      })
      .optional()
  })

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  const { getFieldState, formState, watch } = methods
  const fields = watch()

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const validUsername = data.username && data.username !== user.username
      if (validUsername && !getFieldState('username').invalid) {
        const paths = await updatePathInStorage({
          collection: user.username,
          newCollection: data.username as string,
          document: 'avatar',
          newFileName: `${data.username}-avatar`
        })

        if (paths.length < 0) {
          throw new Error('Something went wrong. Please try again later.')
        }

        await updateUser({
          username: user.username,
          value: {
            username: data.username,
            profile: {
              update: {
                avatar: paths[0]
              }
            }
          }
        })

        setCanUpdateUsername(false)
      }

      const validBio =
        !getFieldState('bio').invalid &&
        data.bio !== user.channel?.description &&
        data.bio
      const channel_name = validUsername ? data.username! : user.username
      if (validBio) {
        await updateChannel({
          channel_name,
          value: {
            description: data.bio
          }
        })
      }

      if (!validBio && !validUsername) return

      addToast({
        id: Date.now(),
        timeout: 4000,
        type: 'success',
        position: 'top-right',
        data: {
          message: 'Changes saved successfully'
        }
      })
      methods.reset()
    } catch (error) {
      addToast({
        id: Date.now(),
        timeout: 4000,
        type: 'error',
        position: 'top-right',
        data: {
          message: 'Something went wrong. Please try again later.'
        }
      })
    }
  }

  useEffect(() => {
    const { username, bio } = fields
    setAreFieldsAble(!!(bio || username))
  }, [fields])

  return (
    <NoSsr>
      <Typrography
        $color="triadic2"
        $text="Profile Settings"
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
      />
      <Typrography
        $color="grey"
        $text="Change identifying details for your account"
        $type="span"
        $fontSize="xsmall"
        $fontWeight="light"
        $margin="0.5rem 0"
      />
      <S.Section>
        <Flex $align="flex-start" $direction="column">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                <TextField
                  label="Username"
                  name="username"
                  // $value={user.username}
                  $error={formState.errors?.username?.message || ''}
                  $success={!getFieldState('username').invalid}
                  disabled={!canUpdateUsername}
                  placeholder={user.username}
                  $response={user.username !== methods.getValues('username')}
                />
                {!canUpdateUsername && (
                  <Typrography
                    $color="triadic2"
                    $text={`You may update your username again in ${daysLeft} day(s)`}
                    $type="span"
                    $fontSize="xsmall"
                    $fontWeight="light"
                  />
                )}
              </div>
              <div>
                <TextField
                  type="textarea"
                  label="Bio"
                  name="bio"
                  placeholder={user.channel?.description || ''}
                  $error={formState.errors?.bio?.message || ''}
                  $success={!getFieldState('bio').invalid}
                />
                <Typrography
                  $color="triadic2"
                  $text="Description for the About panel on your channel page in under 300 characters"
                  $type="span"
                  $fontSize="xsmall"
                  $fontWeight="light"
                />
              </div>
              <Flex
                $justify="flex-end"
                $background="surface"
                $width="100%"
                $padding="2rem"
                aria-label="section-footer"
              >
                <Button
                  type="submit"
                  $bgcolor="primary"
                  $hoverColor="primary"
                  $color="whiteSmoke"
                  $fontSize="small"
                  $fontWeight="semiBold"
                  disabled={
                    !methods.formState.isValid ||
                    methods.formState.isSubmitting ||
                    !areFieldsAble
                  }
                >
                  {methods.formState.isSubmitting || server.pending ? (
                    <Flex $align="center" $justify="center" $gapY="0.3rem">
                      <ReactLoading
                        type="spin"
                        color="#B4BDc7"
                        height={16}
                        width={16}
                      />
                    </Flex>
                  ) : (
                    <>Save Changes</>
                  )}
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </Flex>
      </S.Section>
    </NoSsr>
  )
}

export default ProfileSettingsPage
