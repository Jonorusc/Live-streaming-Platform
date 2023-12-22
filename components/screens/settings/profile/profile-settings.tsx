'use client'
import * as S from './styles'

import NoSsr from '@/components/NoSsr'
import Avatar from '@/components/ui/image'
import Flex from '@/components/ui/flex'
import Button from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
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
import { Check } from 'lucide-react'

const ProfileSettingsPage = ({ user }: { user: CURRENTUSER }) => {
  const server = useFormStatus()
  const usernameUpdatedAt = user.username_updated_at
  const [canUpdateUsername, setCanUpdateUsername] = useState(false)
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

  const [updated, setUpdated] = useState(false)
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
      // .refine(
      //   (username) => {
      //     return username !== user.username
      //   },
      //   { message: 'This is your current username' }
      // )
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
  })

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'all'
  })

  const { getFieldState, formState } = methods

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (data.username === user.username) return
    try {
      const value = {
        username: user.username,
        value: {
          username: data.username,
          username_updated_at: new Date().toISOString()
        }
      }

      await updateUser(value)

      setUpdated(true)
      addToast({
        id: Date.now(),
        timeout: 4000,
        type: 'success',
        position: 'top-right',
        data: {
          message: 'Your username has been updated successfully.'
        }
      })
      setCanUpdateUsername(false)
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
              <TextField
                label="Username"
                name="username"
                $value={user.username}
                $error={formState.errors?.username?.message || ''}
                $success={!getFieldState('username').invalid}
                disabled={!canUpdateUsername}
                placeholder={user.username}
                $response={user.username !== methods.getValues('username')}
                required
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
              <Flex
                $justify="flex-end"
                $background="surface"
                $width="100%"
                $padding="2rem"
                aria-label="section-footer"
              >
                <Button
                  type="submit"
                  $bgcolor={updated ? 'success' : 'primary'}
                  $color="whiteSmoke"
                  $fontSize="small"
                  $fontWeight="semiBold"
                  disabled={
                    !methods.formState.isValid ||
                    methods.formState.isSubmitting ||
                    !canUpdateUsername ||
                    user.username === methods.getValues('username')
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
                    <>
                      {updated ? (
                        <Flex $align="center" $gapY="1rem">
                          <Check size={16} />
                          <span>Updated</span>
                        </Flex>
                      ) : (
                        'Save Changes'
                      )}
                    </>
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
