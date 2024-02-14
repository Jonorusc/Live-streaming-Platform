'use client'

import { useCallback, useEffect, useRef } from 'react'
import { pusherClient } from '@/lib/pusher'
import { useToast } from '../../hooks/use-toast'
import { useUser } from '../../hooks/use-user'
import { $revalidatePath } from '@/actions'
import { CHANNEL } from '@/lib/channels'
import { useFollowedChannels } from '@/hooks/use-followed-channels'
import { useChannels } from '@/hooks/use-channels'

const revalidateServerSide = async (data: CHANNEL) => {
  $revalidatePath('/')
  $revalidatePath(`/${data.name}`)
  $revalidatePath(`/user/settings/`)
  $revalidatePath(`/u/`)
}

export function watchChannels() {
  const loaded = useRef(false)
  const { user } = useUser()
  const { mutate: mutateFollowed } = useFollowedChannels()
  const { mutate: mutateChannels } = useChannels()
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
        revalidateServerSide(data)
        mutateChannels()
        if (data.followers?.find((follower) => follower.userId === user?.id)) {
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
              message: `Playing ${data.stream?.stream_game}`
            }
          })
          mutateFollowed()
        }
      } catch {
        // handle error
      }
    },
    [addToast]
  ) // addToast is a dependency

  const handleLiveEndedEvents = useCallback(async (data: CHANNEL) => {
    try {
      revalidateServerSide(data)
      mutateChannels()
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
