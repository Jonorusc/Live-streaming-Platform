'use client'

import { ChannelsReturn } from '@/lib/channels'
import Card from '@/components/ui/card'
import Flex from '@/components/ui/flex'
import ToolTip from '@/components/ui/tooltip'
import Typrography from '@/components/ui/typography'
import { Heart, HeartOff } from 'lucide-react'
import React from 'react'
import { useFollowedChannels } from '@/hooks/use-followed-channels'
import { Paginate } from './styles'

const FollowedChanels = ({ collapsed }: { collapsed: boolean }) => {
  const { channels, setPage, page, pageSize, isLoadingMore, isReachingEnd } =
    useFollowedChannels()
  const hasChannels = channels.length > 0
  return (
    <>
      <Flex
        $margin={collapsed && !hasChannels ? '0' : '0 0 1rem 0'}
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
                  {hasChannels ? 'FOLLOWED CHANNELS' : 'NO FOLLOWED CHANNELS'}
                </span>
              </Typrography>
            }
          >
            {hasChannels ? <Heart size={20} /> : <HeartOff size={20} />}
          </ToolTip>
        ) : (
          <Typrography
            $fontSize="xsmall"
            $fontWeight="semiBold"
            $color="triadic2"
            $padding="0 1rem"
          >
            <span>FOLLOWED CHANNELS</span>
          </Typrography>
        )}
      </Flex>
      <Flex $direction="column" {...(collapsed ? { $gapX: '1rem' } : {})}>
        {hasChannels ? (
          <>
            {channels.map((channel) => (
              <React.Fragment key={channel.name}>
                <Card
                  title={channel.owner.username}
                  streamer={{
                    stream_game: channel.stream_game!,
                    name: channel.owner.username,
                    picture: channel.owner.profile!.avatar!,
                    stream_title: channel.stream_title!,
                    islive: channel.live!,
                    viewers: channel.stream_viewers!,
                    description: channel.description!
                  }}
                />
              </React.Fragment>
            ))}
            {!collapsed && (
              <>
                <Flex
                  $align="center"
                  $justify="space-between"
                  $padding="0.5rem 1rem"
                >
                  <Paginate
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setPage(page + 1)}
                  >
                    {isReachingEnd ? '' : 'See more'}
                  </Paginate>
                  <Paginate
                    disabled={isLoadingMore || !isReachingEnd}
                    onClick={() => setPage(page - 1)}
                  >
                    {!isReachingEnd && channels.length > pageSize
                      ? 'See less'
                      : ''}
                  </Paginate>
                </Flex>
              </>
            )}
          </>
        ) : (
          <>
            {!collapsed && (
              <Flex $align="center" $gap="1rem" $padding="1rem 1rem 2rem 1rem">
                <HeartOff size={20} /> <span>No followed channels</span>
              </Flex>
            )}
          </>
        )}
      </Flex>
    </>
  )
}

export default FollowedChanels
