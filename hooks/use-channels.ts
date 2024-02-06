'use client'

import { useState, useEffect } from 'react'
import { Channel } from '@prisma/client'
import { pusherClient } from '@/lib/pusher'

export function useChannels({ initial }: { initial: Channel[] }) {
  const [channels, setChannels] = useState<Channel[]>(initial)

  useEffect(() => {
    pusherClient.subscribe('channel')

    pusherClient.bind('live', (data: Channel) => {
      setChannels((prev) => prev.concat(data))
      // maybe I will do something with the data
    })
  }, [])

  return {
    channels,
    setChannels
  }
}
