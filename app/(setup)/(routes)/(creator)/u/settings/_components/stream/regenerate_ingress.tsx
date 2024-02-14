'use client'
import ReactLoading from 'react-loading'
import NoSsr from '@/components/NoSsr'
import Flex from '@/components/ui/flex'
import Button from '@/components/ui/button'
import Select from '@/components/ui/select'

import { useState, useTransition } from 'react'
import { IngressInput } from 'livekit-server-sdk'
import { createIngress } from '@/actions/livekit'
import { useUser } from '@/hooks/use-user'
import { useToast } from '@/hooks/use-toast'

type Props = {
  channel: {
    id: string
    name: string
  }
}

const RegenerateIngress = ({ channel }: Props) => {
  const RTMP = String(IngressInput.RTMP_INPUT)
  const WHIP = String(IngressInput.WHIP_INPUT)
  const [ingressType, setIngressType] = useState(RTMP)
  const [isPending, startTransition] = useTransition()
  const { addToast } = useToast()
  const { userMutate } = useUser()
  const regenerateIngress = () => {
    startTransition(async () => {
      try {
        await createIngress(channel.name, channel.id, parseInt(ingressType))
        userMutate()
        addToast({
          id: Date.now(),
          timeout: 5000,
          type: 'success',
          position: 'top-right',
          data: {
            message: 'Ingress regenerated successfully'
          }
        })
      } catch {
        addToast({
          id: Date.now(),
          timeout: 5000,
          type: 'error',
          position: 'top-right',
          data: {
            message: 'Failed to regenerate ingress'
          }
        })
      }
    })
  }

  return (
    <NoSsr>
      <>
        <Select
          options={[
            { label: 'RTMP', value: RTMP },
            { label: 'WHIP', value: WHIP }
          ]}
          onChange={(value) => setIngressType(value as string)}
          name="ingressType"
        />
        <Button
          type="submit"
          $bgcolor="primary"
          $hoverColor="primary"
          $color="whiteSmoke"
          $fontSize="small"
          $fontWeight="semiBold"
          onClick={regenerateIngress}
          disabled={isPending}
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
            <>Regenerate Ingress</>
          )}
        </Button>
      </>
    </NoSsr>
  )
}

export default RegenerateIngress
