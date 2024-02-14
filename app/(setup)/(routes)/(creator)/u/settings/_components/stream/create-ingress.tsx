'use client'
import { createIngress } from '@/actions/livekit'
import Button from '@/components/ui/button'
import Flex from '@/components/ui/flex'
import { IngressInput } from 'livekit-server-sdk'
import Select from '@/components/ui/select'
import { IngressWrapper } from './styles'
import ReactLoading from 'react-loading'

import { useState, useTransition } from 'react'
import Typrography from '@/components/ui/typography'
import { Section } from '@creator/u/_components/styles'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user'

type Props = {
  channel: {
    id: string
    name: string
  }
}

export const Ingress = ({ channel }: Props) => {
  const RTMP = String(IngressInput.RTMP_INPUT)
  const WHIP = String(IngressInput.WHIP_INPUT)
  const [ingressType, setIngressType] = useState(RTMP)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const { addToast } = useToast()
  const { userMutate } = useUser()

  return (
    <Section>
      <IngressWrapper>
        <Select
          options={[
            { label: 'RTMP', value: RTMP },
            { label: 'WHIP', value: WHIP }
          ]}
          onChange={(value) => setIngressType(value as string)}
          label="Ingress Type"
          name="ingressType"
        />

        {error && (
          <Typrography
            $color="error"
            $text={error}
            $type="h5"
            $fontSize="xsmall"
            $fontWeight="semiBold"
          />
        )}
      </IngressWrapper>

      <Flex
        $justify="flex-end"
        $background="surface"
        $width="100%"
        $padding="2rem"
        aria-label="section-footer"
      >
        <Button
          disabled={isPending || !ingressType}
          $bgcolor="primary"
          $hoverColor="primary"
          $color="whiteSmoke"
          $fontSize="small"
          $fontWeight="semiBold"
          onClick={() => {
            setError('')
            startTransition(async () => {
              try {
                await createIngress(
                  channel.name,
                  channel.id,
                  parseInt(ingressType)
                )
                userMutate()
                addToast({
                  id: Date.now(),
                  timeout: 5000,
                  type: 'success',
                  position: 'top-right',
                  data: {
                    message: 'You can now start streaming.'
                  }
                })
              } catch {
                setError('Error creating Ingress. Please try again.')
              }
            })
          }}
        >
          {isPending ? (
            <Flex $align="center" $justify="center" $gapY="0.3rem">
              <ReactLoading
                type="spin"
                color="#B4BDc7"
                height={16}
                width={16}
              />
            </Flex>
          ) : (
            <>Create Ingress</>
          )}
        </Button>
      </Flex>
    </Section>
  )
}

const CreateIngress = ({ channel }: Props) => {
  return (
    <Flex $direction="column" $gap="1rem">
      You didn't create a Stream Key yet, want to create one now?
      <Ingress channel={channel} />
    </Flex>
  )
}

export default CreateIngress
