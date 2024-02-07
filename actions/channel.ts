'use server'

import { db } from '@/lib/db'
import { Channel } from '@prisma/client'
import { getCurrentUser } from './user'
import { revalidatePath } from 'next/cache'

export const fetchChannel = async (
  channel_name: string
): Promise<Channel | null> => {
  if (!channel_name) {
    throw new Error('Channel name is required')
  }

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    throw new Error('Internal Error')
  }

  let channel = null
  try {
    channel = await db.channel.findUnique({
      where: {
        name: channel_name,
        NOT: {
          ownerId: currentUser.id,
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

export const updateChannel = async ({
  channel_name,
  key,
  value
}: {
  channel_name: string
  key?: keyof Channel
  value: string | Partial<Record<keyof Channel, any>>
}) => {
  if (!channel_name || !value) {
    throw new Error('Channel name and value are required')
  }

  try {
    const channel = await db.channel.update({
      where: {
        name: channel_name
      },
      data: {
        ...(typeof value === 'object'
          ? value
          : { [key as string]: value as string })
      }
    })
    revalidatePath('/')
    revalidatePath(`/${channel_name}`)
    revalidatePath(`/user/settings/`)
    revalidatePath(`/u/`)
    return channel
  } catch (error) {
    throw new Error(String(error))
  }
}
