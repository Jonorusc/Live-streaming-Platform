'use client'

import { useCallback, useEffect, useRef } from 'react'
import { pusherClient } from '@/lib/pusher'
import { useToast } from './use-toast'
import { useUser } from './use-user'
import { $revalidatePath } from '@/actions'
import { CHANNEL } from '@/actions/(routes)/main'

const revalidateChannels = async (data: CHANNEL) => {
  $revalidatePath('/')
  $revalidatePath(`/${data.name}`)
  $revalidatePath(`/user/settings/`)
  $revalidatePath(`/u/`)
}

export function watchChannels() {
  const loaded = useRef(false)
  const { user } = useUser()
  const { addToast } = useToast()
  /* 
    handleEvents
    @description
      - takes followed channels and most viewed channels and update the state

    @returns data: Channel
  */

  const handleLiveEvents = useCallback(
    async (data: CHANNEL) => {
      try {
        revalidateChannels(data)
        // if (data.followers?.find((follower) => follower.userId === user?.id)) {
        // if the user is the owner of the channel, do not show the toast
        addToast({
          id: Date.now(),
          timeout: 5000,
          type: 'islive',
          position: 'top-right',
          data: {
            profile: {
              picture: data.owner.profile?.avatar as string,
              name: data.name as string
            },
            title: `${data.name} is live now!`,
            message: `Playing ${data.streaming_game}`
          }
        })

        // }
      } catch {
        // handle error
      }
    },
    [addToast]
  ) // addToast is a dependency

  const handleLiveEndedEvents = useCallback(async (data: CHANNEL) => {
    try {
      revalidateChannels(data)
    } catch {
      // handle error
    }
  }, []) // no dependencies

  useEffect(() => {
    if (loaded.current) return
    const channel = pusherClient.subscribe('channel')
    loaded.current = true

    channel.bind('live', handleLiveEvents)
    channel.bind('live_ended', handleLiveEndedEvents)
  }, [])
}
