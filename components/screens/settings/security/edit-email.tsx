'use client'

import Typrography from '@/components/ui/typography'
import Button from '@/components/ui/button'
import Flex from '@/components/ui/flex'
import TextField from '@/components/ui/text'
import ReactLoading from 'react-loading'

import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormStatus } from 'react-dom'
import { tempEmailDomains } from '@/utils/invalid-things'
import { useState, useEffect } from 'react'
import { updateemail, sendemailverification } from '@/lib/firebase/actions'
import { signin } from '@/lib/firebase/auth'

import { CURRENTUSER, updateUser, verifyUserEmail } from '@/actions/user'
import { Responses } from '@/components/ui/logos/svg'

const EditUserEmail = ({
  user,
  setEdit
}: {
  user: CURRENTUSER
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const server = useFormStatus()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 8000)
    }
  }, [error])

  const schema = z
    .object({
      email: z
        .string()
        .email({ message: 'Invalid email address' })
        .refine(
          (email) => {
            const domain = email.split('@')[1]
            return !tempEmailDomains.includes(domain)
          },
          { message: 'Temporary emails are not allowed' }
        )
        .refine(
          async (email) => {
            if (email.length < 6) return false
            try {
              const user = await verifyUserEmail(email)
              if (user) return false
              return true
            } catch {
              return true
            }
          },
          {
            message: 'This email is already linked to an account'
          }
        ),
      confirmEmail: z.string(),
      password: z.string().min(6, {
        message: 'Password is too short, must be at least 6 characters'
      })
    })
    .refine((data) => data.email === data.confirmEmail, {
      path: ['confirmEmail'],
      message: 'Emails do not match'
    })

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  const { getFieldState, formState } = methods

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await signin(user.email, data.password)
      await updateemail(data.email).then(async () => {
        await updateUser({
          username: user.username,
          value: {
            email: data.email,
            email_verified: false
          }
        })

        await sendemailverification()

        setSuccess('A verification email has been sent to your new email')
      })
    } catch (err: any) {
      setError(
        err.message ||
          'Something went wrong when trying to update your email. Please try again later.'
      )
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {!success && (
            <>
              <Typrography
                $text="Enter your new email address"
                $color="triadic2"
                $type="h5"
                $fontSize="small"
                $fontWeight="semiBold"
                $margin="0.5rem 0"
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                $error={formState.errors?.email?.message || ''}
                $success={!getFieldState('email').invalid}
                $response
                required
              />

              <TextField
                label="Confirm Email"
                type="email"
                name="confirmEmail"
                $error={formState.errors?.confirmEmail?.message || ''}
                $success={!getFieldState('confirmEmail').invalid}
                $response
                required
              />

              <TextField
                label="Enter your password to confirm changes"
                type="password"
                name="password"
                $error={formState.errors?.password?.message || ''}
                $success={!getFieldState('password').invalid}
                required
              />
            </>
          )}

          <Flex
            $justify="flex-end"
            $background="surface"
            $width="100%"
            $padding="2rem"
            $align="center"
            $gapY="1rem"
            aria-label="section-footer"
          >
            <Button
              $bgcolor="darkGrey"
              $hoverColor="darkGrey"
              $color="triadic2"
              $fontSize="small"
              $fontWeight="semiBold"
              onClick={() => {
                setEdit(false)
                setSuccess('')
                setError('')
              }}
            >
              {success ? 'Back' : 'Cancel'}
            </Button>
            {!success && (
              <Button
                type="submit"
                $bgcolor="primary"
                $hoverColor="primary"
                $color="whiteSmoke"
                $fontSize="small"
                $fontWeight="semiBold"
                disabled={
                  !methods.formState.isValid || methods.formState.isSubmitting
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
                    <span>Updating...</span>
                  </Flex>
                ) : (
                  'Save Changes'
                )}
              </Button>
            )}
          </Flex>

          <Typrography
            $text="After changing your email, you will have to verify your new email address."
            $color="triadic2"
            $type="p"
            $fontSize="xsmall"
            $margin="0.5rem 0"
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
          {success && (
            <Flex $align="center" $gapY="0.5rem" $margin="0.5rem 0">
              <Responses $type="success" />
              <Typrography
                $text={success}
                $color="success"
                $type="p"
                $fontSize="xsmall"
              />
            </Flex>
          )}
        </form>
      </FormProvider>
    </>
  )
}

export default EditUserEmail
