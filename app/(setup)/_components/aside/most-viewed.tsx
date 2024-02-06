'use client'

import { CHANNELS } from '@/actions/(routes)/main'
import Card from '@/components/ui/card'
import Flex from '@/components/ui/flex'
import ToolTip from '@/components/ui/tooltip'
import Typrography from '@/components/ui/typography'
import { Radio, ShieldX } from 'lucide-react'
import React from 'react'

const MostViewed = ({
  channels,
  collapsed
}: {
  channels: CHANNELS
  collapsed: boolean
}) => {
  const hasChannels = channels.length > 0
  return (
    <>
      <Flex
        $margin="0 0 1rem 0"
        $align="center"
        $justify={collapsed ? 'center' : 'space-between'}
      >
        {collapsed ? (
          <ToolTip
            $arrow
            $position="right"
            $background="surface"
            $content={
              <Typrography
                $fontSize="xsmall"
                $fontWeight="semiBold"
                $color="triadic2"
                $width="max-content"
              >
                <span>
                  {hasChannels ? 'STREAMING NOW' : "THERE'S NO ONE LIVE"}
                </span>
              </Typrography>
            }
          >
            {hasChannels ? <Radio size={20} /> : <ShieldX size={20} />}
          </ToolTip>
        ) : (
          <Typrography
            $fontSize="xsmall"
            $fontWeight="semiBold"
            $color="triadic2"
            $padding="0 1rem"
          >
            <span>STREAMING NOW</span>
          </Typrography>
        )}
      </Flex>
      <Flex $direction="column" {...(collapsed ? { $gapX: '1rem' } : {})}>
        {hasChannels ? (
          <>
            {channels?.map((channel) => (
              <React.Fragment key={channel.name}>
                <Card
                  message={channel.streaming_game!}
                  title={channel.owner.username}
                  streamer={{
                    name: channel.owner.username,
                    picture: channel.owner.profile!.avatar!,
                    islive: channel.live!,
                    viewers: channel.streaming_viewers!,
                    description: channel.description!
                  }}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {!collapsed && (
              <Flex $align="center" $gap="1rem" $padding="1rem 1rem 2rem 1rem">
                <ShieldX size={20} /> <span>There's no one live</span>
              </Flex>
            )}
          </>
        )}
      </Flex>
    </>
  )
}

export default MostViewed
