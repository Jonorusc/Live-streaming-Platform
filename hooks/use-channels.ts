'use client'

import { useState, useEffect } from 'react'
import { pusherClient } from '@/lib/pusher'
import { useUser } from './use-user'
import {
  CHANNELS,
  getFollowedChannels,
  getMostViewedChannels
} from '@/actions/(routes)/main'
import { Channel } from '@prisma/client'

export function useChannels({
  initial_followedChannels,
  initial_mostViewedChannels
}: {
  initial_followedChannels: CHANNELS
  initial_mostViewedChannels: CHANNELS
}) {
  const [followedChannels, setFollowedChannels] = useState<CHANNELS>(
    initial_followedChannels
  )
  const [mostViewed, setMostViewed] = useState<CHANNELS>(
    initial_mostViewedChannels
  )
  const { user } = useUser()

  const handleEvents = async (data: Channel) => {
    if (!user) return
    try {
      // takes followed channels and update the state
      const $followedChannels = await getFollowedChannels({
        userId: user.id
      })
      if ($followedChannels) setFollowedChannels($followedChannels)
      // takes most viewed channels and update the state
      const $mostViewed = await getMostViewedChannels({
        skip: 0,
        take: 10
      })
      if ($mostViewed) setMostViewed($mostViewed)
    } catch {
      // handle error
    }
  }

  useEffect(() => {
    pusherClient.subscribe('channel')

    pusherClient.bind('live', handleEvents)
    pusherClient.bind('live_ended', handleEvents)
  }, [])

  return {
    followedChannels,
    mostViewed
  }
}
