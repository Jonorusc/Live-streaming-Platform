'use server'

import { db } from '@/lib/db'
import { Channel } from '@prisma/client'

export const fetchChannel = async (
  channel_name: string
): Promise<Channel | null> => {
  if (!channel_name) {
    return null
  }

  let channel = null
  try {
    channel = await db.channel.findUnique({
      where: {
        name: channel_name
      }
    })

    if (!channel) {
      return channel
    }

    return channel
  } catch {
    return null
  }
}
