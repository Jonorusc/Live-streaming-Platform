'use client'

import { watchChannels } from '@/hooks/watch-channels'
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
