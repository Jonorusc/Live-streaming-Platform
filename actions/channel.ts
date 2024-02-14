'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { CHANNEL } from '@/lib/channels'
import { Channel } from '@prisma/client'

export const getChannelByName = async (
  channel_name: string
): Promise<CHANNEL | null> => {
  if (!channel_name) {
    throw new Error('Channel name is required')
  }

  try {
    const channel = await db.channel.findUnique({
      where: {
        name: channel_name,
        NOT: {
          owner: {
            deactivated: true
          }
        }
      },
      select: {
        id: true,
        owner: {
          include: {
            profile: true
          }
        },
        ownerId: true,
        stream: true,
        name: true,
        description: true,
        subscribers: true,
        followers: true,
        categories: true
      }
    })

    if (!channel) {
      return null
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
