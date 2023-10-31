'use client'

import * as S from './styles'

import axios from 'axios'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModal } from '@/hooks/use-modal'

import { ModalWrapper } from '@/components/modals'
import { Twitch } from '@/components/ui/logos'
import Icon from '@/components/ui/icon'
import Button from '@/components/ui/button'
import Grid from '@/components/ui/grid'
import TextField from '@/components/ui/text'
import Flex from '@/components/ui/flex'
import passwordStrength from '@/utils/passwordStrength'

const schema = z.object({
  username: z
    .string()
    .min(6, { message: 'Username must be at least 6 characters' })
    .refine(
      async (username) => {
        if (username.length < 6) return false
        try {
          await axios.get('/api/users', { params: { username } })
          return false
        } catch {
          return true
        }
      },
      {
        message: 'This username is already taken'
      }
    ),
  email: z.string().email({ message: 'Invalid email address' })
  .refine(
    async (email) => {
      if (email.length < 6) return false
      try {
        await axios.get('/api/users', { params: { email } })
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

type SignUpFormValues = z.infer<typeof schema>

export type SignUpModalProps = {}
const SignUpModal = (props: SignUpModalProps) => {
  const { onClose, onOpen } = useModal()

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    reValidateMode: 'onSubmit'
  })

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await axios.post('/api/users', data)

      // send notification and close the modal
      onClose()
    } catch(error) {
      console.log(error)
    }
    onClose()
  }

  return (
    <ModalWrapper>
      <S.ModalSignUp>
        <Button
          $position="absolute"
          $top="1rem"
          $right="1rem"
          $hoverColor="grey"
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
                  $error={methods.formState.errors?.username?.message || ''}
                  $success={
                    !methods.formState.errors?.username?.message || false
                  }
                  $response
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  $error={methods.formState.errors?.email?.message || ''}
                  $success={!methods.formState.errors?.email?.message || false}
                  $response
                  required
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  $error={methods.formState.errors?.password?.message || ''}
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
                    $hoverColor="grey"
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
                    disabled={!methods.formState.isValid}
                  >
                    Sign Up
                  </Button>
                </Flex>
              </form>
            </FormProvider>
          </Flex>
        </Flex>
      </S.ModalSignUp>
    </ModalWrapper>
  )
}

export default SignUpModal
