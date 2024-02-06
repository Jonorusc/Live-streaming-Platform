'use server'
import { db } from '@/lib/db'
// import { cookies } from 'next/headers'
// import { revalidatePath } from 'next/cache'
import { Channel, GAMES_CATEGORIES, Profile, User } from '@prisma/client'

type Pagination = {
  skip?: number
  take?: number
}

export type CHANNELS = {
  id: string | null
  name: string | null
  description: string | null
  owner: Omit<User, 'firebase_id' | 'id'> & {
    profile: Profile | null
  }
  streaming_viewers: number | null
  streaming_title: string | null
  streaming_game: string | null
  streaming_category: GAMES_CATEGORIES | null
  live: boolean
}[]

export type FollowedProps = {
  userId: string
} & Pagination

/*

  returns the user's followed channels in order of most viewers

  @example
  ```javascript s
    const channels = await getFollowedChannels({ userId: '123' })
  ```

*/

export const getFollowedChannels = async ({
  skip = 0,
  take = 10,
  userId
}: FollowedProps): Promise<CHANNELS | null> => {
  if (!userId) throw new Error('No user id provided')
  // Get the user's followed channels
  try {
    const channels = await db.follower.findMany({
      where: {
        id: userId,
        AND: {
          channel: {
            live: true
          }
        }
      },
      select: {
        channel: {
          select: {
            id: true,
            name: true,
            description: true,
            owner: {
              include: {
                profile: true
              }
            },
            streaming_viewers: true,
            streaming_title: true,
            streaming_game: true,
            streaming_category: true,
            live: true
          }
        }
      },
      take,
      skip: skip * take,
      orderBy: {
        channel: {
          streaming_viewers: 'desc'
        }
      }
    })

    if (!channels || channels.length === 0) return null
    const followedChannels = channels.map((channel) => channel.channel)

    return followedChannels
  } catch (error) {
    throw new Error(String(error))
  }
}

/*

  returns the most viewed channels

  @example
  ```javascript 
    const channels = await getMostViewedChannels()
  ```

  @return

  ```typescript
  {
    id: string,
    name: string,
    description: string,
    owner: User
    streaming_viewers: number,
    streaming_title: string,
    streaming_game: string,
    streaming_category: GAMES_CATEGORIES,
    live: boolean,
  }
  ```

*/

export const getMostViewedChannels = async ({
  skip = 0,
  take = 10
}: Pagination): Promise<CHANNELS | null> => {
  try {
    const viewedChannels = await db.channel.findMany({
      take,
      skip: skip * take,
      orderBy: {
        streaming_viewers: 'desc'
      },
      where: {
        live: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        owner: {
          include: {
            profile: true
          }
        },
        streaming_viewers: true,
        streaming_title: true,
        streaming_game: true,
        streaming_category: true,
        live: true
      }
    })

    if (!viewedChannels || viewedChannels.length === 0) return null

    return viewedChannels
  } catch (error) {
    throw new Error(String(error))
  }
}

/* 
  I'll use some machine learning to recommend channels to the user
  **in the future**
*/

export const getRecommendedChannels = async ({}): Promise<Channel[] | null> => {
  // try {
  //   const channels = []
  //   return channels
  // } catch (error) {
  //   throw new Error(String(error))
  // }
  return null
}
