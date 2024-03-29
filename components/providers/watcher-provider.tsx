'use client'

import { watchChannels } from '@/lib/pusher/watch-channels'
import { useEffect, useState } from 'react'

export const WatcherProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  watchChannels()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return null
}
