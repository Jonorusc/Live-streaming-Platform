'use client'
import { Section } from '@creator/u/_components/styles'
import ReactLoading from 'react-loading'
import TextField from '@/components/ui/text/no-hrf'
import Typrography from '@/components/ui/typography'
import NoSsr from '@/components/NoSsr'
import { Channel } from '@prisma/client'
import Flex from '@/components/ui/flex'
import Button from '@/components/ui/button'
import Select from '@/components/ui/select'

import { useState, useTransition } from 'react'
import { IngressInput } from 'livekit-server-sdk'
import { createIngress } from '@/actions/livekit'
import { useUser } from '@/hooks/use-user'

const StreamKeyPreferences = ({ channel }: { channel: Channel }) => {
  const RTMP = String(IngressInput.RTMP_INPUT)
  const WHIP = String(IngressInput.WHIP_INPUT)
  const [ingressType, setIngressType] = useState(RTMP)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const { userMutate } = useUser()
  const regenerateIngress = () => {
    setError('')
    startTransition(async () => {
      try {
        await createIngress(channel.id, channel.ownerId, parseInt(ingressType))
        userMutate()
      } catch {
        setError(
          'There was an error regenerating the ingress. Please try again.'
        )
      }
    })
  }

  return (
    <NoSsr>
      <Typrography
        $color="triadic2"
        $text="Stream Key & Preferences"
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
      />
      <Section>
        <Flex $direction="column" $margin="0 0 8rem 0">
          <TextField
            $copy
            label="Server Url"
            name="serverUrl"
            $success={false}
            $value={channel.stream_server_url!}
            type="password"
            disabled
          />
          <TextField
            $copy
            label="Stream Key"
            name="streamkey"
            $success={false}
            $value={channel.stream_key!}
            type="password"
            disabled
            // $handleChange={(e) => (e.target.value)}
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
        </Flex>
        <Flex
          $justify="flex-end"
          $background="surface"
          $width="100%"
          $gapY="1rem"
          $align="center"
          $padding="2rem"
          aria-label="section-footer"
        >
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
        </Flex>
      </Section>
    </NoSsr>
  )
}

export default StreamKeyPreferences
