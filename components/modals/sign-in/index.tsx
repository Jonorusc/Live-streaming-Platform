'use client'

import * as S from './styles'

import { useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import useClickOutside from '@/hooks/use-clickoutside'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModal } from '@/hooks/use-modal'
import { useFormStatus } from 'react-dom'
import { signin } from '@/lib/firebase/auth'
import { authenticateUser } from '@/actions/user'
import { useSWRConfig } from 'swr'

import Link from 'next/link'
import { ModalWrapper } from '@/components/modals'
import { Twitch } from '@/components/ui/logos'
import Icon from '@/components/ui/icon'
import ReactLoading from 'react-loading'
import Button from '@/components/ui/button'
import Grid from '@/components/ui/grid'
import TextField from '@/components/ui/text'
import { Error } from '@/components/ui/text/styles'
import Flex from '@/components/ui/flex'
import { UserReturnProps } from '@/lib/firebase/auth'
import NoSsr from '@/components/NoSsr'

export type SignInModalProps = {}
const SignInModal = (props: SignInModalProps) => {
  const [authError, setAuthError] = useState('')
  const { onClose, onOpen } = useModal()
  const modalRef = useRef(null)
  const server = useFormStatus()
  const { mutate } = useSWRConfig()

  useClickOutside(modalRef, onClose)

  const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
  })

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'all'
  })

  const { getFieldState, formState, setError } = methods

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const { email, password } = data
      const { data: firebaseUser } = await signin(email, password)

      if (!firebaseUser) {
        setAuthError(
          'Un expected error occurred while authenticating user, please try again later. If the problem persists, contact support.'
        )
        return
      }
      // authenticate user
      const user = await authenticateUser(firebaseUser.uid)

      if (!user) {
        setAuthError(
          'Un expected error occurred while authenticating user, please try again later. If the problem persists, contact support.'
        )
        return
      }

      // close modal
      // store user in the user context
      mutate('/api/user')
      onClose()
    } catch (resp: any) {
      const errorType = resp?.error?.email
        ? 'email'
        : resp?.error?.password
        ? 'password'
        : null

      if (errorType) {
        setError(errorType, {
          type: 'manual',
          message: resp?.error![errorType]
        })
      } else if (resp?.message) {
        setAuthError(resp?.message)
      } else {
        setAuthError('Unexpected error, please try again later.')
      }
    }
  }

  return (
    <NoSsr>
      <ModalWrapper>
        <S.ModalSignIn ref={modalRef}>
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
          <Flex
            $direction="column"
            $width="50rem"
            $padding="5rem 3rem 2rem 3rem"
          >
            <Flex $gapY="1.3rem" $align="center" $alingSelf="center">
              <Twitch />
              <h4>Log in to Twitch</h4>
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
                    label="Email"
                    name="email"
                    $error={formState.errors?.email?.message || ''}
                    $success={!getFieldState('email').invalid}
                    required
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    $error={formState.errors?.password?.message || ''}
                    required
                  />
                  <Flex
                    $align="center"
                    $direction="column"
                    $margin="2rem 0 2rem 0"
                    $gapX="1.3rem"
                  >
                    <Link href="/user/account-recovery" onClick={onClose}>
                      Trouble logging in?
                    </Link>

                    <Button
                      type="submit"
                      $width="100%"
                      $bgcolor="primary"
                      $hoverColor="primary"
                      $color="whiteSmoke"
                      $fontSize="small"
                      $fontWeight="semiBold"
                      disabled={
                        !methods.formState.isValid ||
                        methods.formState.isSubmitting ||
                        server.pending
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
                          <span>Logging in...</span>
                        </Flex>
                      ) : (
                        'Log In'
                      )}
                    </Button>
                    <Button
                      $fontSize="small"
                      $color="primary"
                      $width="100%"
                      $hoverColor="surface"
                      $fontWeight="semiBold"
                      onClick={() => {
                        onClose()
                        onOpen('signup')
                      }}
                    >
                      Don't have an account? Sign Up here
                    </Button>
                  </Flex>
                </form>
              </FormProvider>
            </Flex>
            {authError && <Error>{authError}</Error>}
          </Flex>
        </S.ModalSignIn>
      </ModalWrapper>
    </NoSsr>
  )
}

export default SignInModal
