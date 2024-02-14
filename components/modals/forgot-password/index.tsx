'use client'
import * as S from './styles'

import Typrography from '@/components/ui/typography'
import { ModalWrapper } from '@/components/modals'
import TextField from '@/components/ui/text'
import Button from '@/components/ui/button'
import ReactLoading from 'react-loading'
import Flex from '@/components/ui/flex'
import NoSsr from '@/components/NoSsr'

import { handlepasswordreset } from '@/lib/firebase/actions'
import passwordStrength from '@/lib/utils/password-strength'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useModal } from '@/hooks/use-modal'
import { useFormStatus } from 'react-dom'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const ForgotPasswordModal = () => {
  const { data, onOpen, onClose } = useModal()
  const { actionCode } = data
  const server = useFormStatus()
  const { addToast } = useToast()
  const [error, setError] = useState('')
  const router = useRouter()

  const schema = z
    .object({
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
        }),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords do not match'
    })

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'all'
  })

  const { getFieldState, formState } = methods

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await handlepasswordreset(actionCode, data.password)
      addToast({
        id: Date.now(),
        timeout: 5000,
        type: 'success',
        position: 'top-right',
        data: {
          message: 'Password changed successfully'
        }
      })
      router.push('/')
      onOpen('signin')
    } catch (err: any) {
      setError(err as string)
    }
  }

  return (
    <NoSsr>
      <ModalWrapper>
        <S.ModalForgotPassword>
          <Flex
            $direction="column"
            $width="50rem"
            $padding="2rem 2rem 1rem 2rem"
          >
            <Typrography
              $text="Create a new password"
              $color="triadic2"
              $type="h5"
            />
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <TextField
                  label="Password"
                  name="password"
                  $error={formState.errors?.password?.message || ''}
                  $success={!getFieldState('password').invalid}
                  $response
                  required
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  $error={formState.errors?.confirmPassword?.message || ''}
                  $success={!getFieldState('confirmPassword').invalid}
                  required
                />
                <Flex
                  $align="center"
                  $justify="space-between"
                  $margin="3rem 0 0 0"
                >
                  <Button
                    $fontSize="small"
                    $color="primary"
                    $hoverColor="surface"
                    onClick={() => {
                      onClose()
                      router.push('/')
                    }}
                  >
                    Cancel
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
                        <span>Wait...</span>
                      </Flex>
                    ) : (
                      'Save'
                    )}
                  </Button>
                </Flex>
                {error && (
                  <Typrography
                    $fontSize="small"
                    $text={error}
                    $color="error"
                    $type="span"
                  />
                )}
              </form>
            </FormProvider>
          </Flex>
        </S.ModalForgotPassword>
      </ModalWrapper>
    </NoSsr>
  )
}

export default ForgotPasswordModal
