'use client'

import * as S from './styles'

// helpers
import { useRef, useState } from 'react'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModal } from '@/hooks/use-modal'
import passwordStrength from '@/utils/password-strength'
import { useFormStatus } from 'react-dom'
import { useSWRConfig } from 'swr'
// components
import { ModalWrapper } from '@/components/modals'
import { Twitch } from '@/components/ui/logos'
import Icon from '@/components/ui/icon'
import Button from '@/components/ui/button'
import Grid from '@/components/ui/grid'
import TextField from '@/components/ui/text'
import { Error } from '@/components/ui/text/styles'
import Flex from '@/components/ui/flex'
import { useToast } from '@/hooks/use-toast'
import useClickOutside from '@/hooks/use-clickoutside'
import ReactLoading from 'react-loading'
import { createUser, verifyUserName, verifyUserEmail } from '@/actions/user'

export type SignUpModalProps = {}
const SignUpModal = (props: SignUpModalProps) => {
  const { onClose, onOpen } = useModal()
  const { addToast } = useToast()
  const modalRef = useRef(null)
  const [authError, setAuthError] = useState('')
  const server = useFormStatus()
  const { mutate } = useSWRConfig()

  useClickOutside(modalRef, onClose)

  const schema = z.object({
    username: z
      .string()
      .min(6, { message: 'Username must be at least 6 characters' })
      .refine(
        async (username) => {
          if (username.length < 6) return false
          // if there is an account in the response so we dont let the username available to be used
          // in other words, if the username is already taken (return false because is the way react hook form works)
          try {
            await verifyUserName(username)
            return false
          } catch {
            return true
          }
        },
        {
          message: 'This username is already taken'
        }
      ),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .refine(
        async (email) => {
          if (email.length < 6) return false
          try {
            await verifyUserEmail(email)
            return false
          } catch {
            return true
          }
        },
        {
          message: 'This email is already linked to an account'
        }
      ),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .refine((password) => /[A-Z]/.test(password), {
        message: 'Password must contain at least one uppercase letter'
      })
      .refine((password) => /\d/.test(password), {
        message: 'Password must contain at least one digit'
      })
      .refine((password) => passwordStrength(password).strength !== 'Weak', {
        message: 'Password is not strong enough'
      })
  })

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const { getFieldState, formState } = methods

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await createUser(data)
      mutate('/api/user')
      addToast({
        id: Date.now(),
        type: 'success',
        position: 'top-right',
        timeout: 5000,
        data: {
          message: 'Account created successfully. Enjoy Twitch!'
        }
      })
      onClose()
    } catch (error) {
      setAuthError('An error occurred while creating your account. Try again.')
    }
  }

  return (
    <ModalWrapper>
      <S.ModalSignUp ref={modalRef}>
        <Button
          $position="absolute"
          $top="1rem"
          $right="1rem"
          $hoverColor="surface"
          onClick={onClose}
        >
          <Grid $placeItems="center">
            <Icon name="x" size={24} />
          </Grid>
        </Button>
        <Flex $direction="column" $width="50rem" $padding="5rem 3rem 2rem 3rem">
          <Flex $gapY="1.3rem" $align="center" $alingSelf="center">
            <Twitch />
            <h4>Join Twitch Today</h4>
          </Flex>
          <Flex
            $direction="column"
            $gapY="1.3rem"
            $width="100%"
            $margin="2.5rem 0 0 0"
          >
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <TextField
                  label="Username"
                  name="username"
                  $error={formState.errors?.username?.message || ''}
                  $success={!getFieldState('username').invalid}
                  $response
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  $error={formState.errors?.email?.message || ''}
                  $success={!getFieldState('email').invalid}
                  $response
                  required
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  $error={formState.errors?.password?.message || ''}
                  $response
                  required
                />
                <Flex
                  $align="center"
                  $justify="space-between"
                  $margin="10rem 0 0 0"
                >
                  <Button
                    $fontSize="small"
                    $color="primary"
                    $hoverColor="surface"
                    $fontWeight="semiBold"
                    onClick={() => {
                      onClose()
                      onOpen('signin')
                    }}
                  >
                    Already a Twitch user? Log In
                  </Button>
                  <Button
                    type="submit"
                    $bgcolor="primary"
                    $hoverColor="primary"
                    $color="whiteSmoke"
                    $fontSize="small"
                    $fontWeight="semiBold"
                    disabled={
                      !methods.formState.isValid ||
                      methods.formState.isSubmitting
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
                        <span>Creating...</span>
                      </Flex>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </Flex>
              </form>
            </FormProvider>
          </Flex>
          {authError && <Error>{authError}</Error>}
        </Flex>
      </S.ModalSignUp>
    </ModalWrapper>
  )
}

export default SignUpModal
