'use server'

import { db } from '@/lib/db'
import { Channel } from '@prisma/client'
import { getCurrentUser } from './user'

export const fetchChannel = async (
  channel_name: string
): Promise<Channel | null> => {
  if (!channel_name) {
    throw new Error('Channel name is required')
  }

  const curentUser = await getCurrentUser()

  if (!curentUser) {
    throw new Error('Internal Error')
  }

  let channel = null
  try {
    channel = await db.channel.findUnique({
      where: {
        name: channel_name,
        NOT: {
          ownerId: curentUser.id,
          owner: {
            deactivated: true
          }
        }
      }
    })

    if (!channel) {
      return channel
    }

    return channel
  } catch (error) {
    throw new Error(String(error))
  }
}
