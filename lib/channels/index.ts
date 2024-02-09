'use server'

import { db } from '@/lib/db'
import {
  Channel,
  GAMES_CATEGORIES,
  Profile,
  User,
  Subscriber,
  Follower
} from '@prisma/client'
import { getCurrentUser } from '@/actions/user'

export type Pagination = {
  skip?: number
  take?: number
}

export type CHANNEL = {
  name: string | null
  description: string | null
  owner: Omit<User, 'firebase_id' | 'id'> & {
    profile: Profile | null
  }
  ownerId: string | null
  stream_viewers: number | null
  stream_title: string | null
  stream_game: string | null
  stream_thumbnail: string | null
  stream_started_at: Date | null
  stream_ended_at: Date | null
  subscribers: Subscriber[] | null
  followers: Follower[] | null
  categories: GAMES_CATEGORIES[] | null
  stream_category: GAMES_CATEGORIES | null
  live: boolean
}

export type CHANNELS = CHANNEL[]

export type ChannelsReturn = { data: CHANNELS | []; count: number }

/*
  returns the user's followed channels in order of most viewers

  @example
  ```javascript s
    const channels = await getFollowedChannels({ userId: '123' })
  ```
*/

export const getFollowedChannels = async ({
  skip = 0,
  take = 10
}: Pagination): Promise<ChannelsReturn> => {
  // Get the user's followed channels
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return { data: [], count: 0 }
  }

  try {
    const [channels, count] = await db.$transaction([
      db.follower.findMany({
        where: {
          id: currentUser.id,
          NOT: {
            channel: {
              owner: {
                deactivated: true
              }
            }
          }
        },
        select: {
          channel: {
            select: {
              owner: {
                include: {
                  profile: true
                }
              },
              ownerId: true,
              live: true,
              name: true,
              stream_category: true,
              description: true,
              subscribers: true,
              stream_title: true,
              stream_viewers: true,
              stream_game: true,
              stream_thumbnail: true,
              stream_started_at: true,
              stream_ended_at: true,
              followers: true,
              categories: true
            }
          }
        },
        take,
        skip: skip * take,
        orderBy: [
          {
            channel: {
              live: 'desc'
            }
          },
          {
            channel: {
              stream_viewers: 'desc'
            }
          },
          {
            channel: {
              stream_started_at: 'desc'
            }
          }
        ]
      }),
      db.follower.count({
        where: {
          id: currentUser.id,
          NOT: {
            channel: {
              owner: {
                deactivated: true
              }
            }
          }
        }
      })
    ])

    if (!channels || channels.length === 0) return { data: [], count: 0 }
    const followedChannels = channels.map((channel) => channel.channel)

    return { data: followedChannels, count: count }
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
    stream_viewers: number,
    stream_title: string,
    stream_game: string,
    stream_category: GAMES_CATEGORIES,
    live: boolean,
  }
  ```
*/

export const getMostViewedChannels = async ({
  skip = 0,
  take = 10
}: Pagination): Promise<ChannelsReturn> => {
  try {
    const currentUser = await getCurrentUser()

    const [viewedChannels, count] = await db.$transaction([
      db.channel.findMany({
        take,
        skip: skip * take,
        orderBy: [
          {
            stream_viewers: 'desc'
          }
        ],
        where: {
          live: true,
          AND: [
            {
              NOT: {
                ownerId: currentUser?.id || undefined,
                owner: {
                  deactivated: true
                },
                followers: {
                  some: {
                    id: currentUser?.id || undefined
                  }
                }
              }
            }
          ]
        },
        select: {
          owner: {
            include: {
              profile: true
            }
          },
          ownerId: true,
          live: true,
          name: true,
          stream_category: true,
          description: true,
          subscribers: true,
          stream_title: true,
          stream_viewers: true,
          stream_game: true,
          stream_thumbnail: true,
          stream_started_at: true,
          stream_ended_at: true,
          followers: true,
          categories: true
        }
      }),
      db.channel.count({
        where: {
          live: true,
          AND: [
            {
              NOT: {
                ownerId: currentUser?.id || undefined,
                owner: {
                  deactivated: true
                }
              }
            }
          ]
        }
      })
    ])

    if (!viewedChannels || viewedChannels.length === 0)
      return {
        data: [],
        count: 0
      }

    return {
      data: viewedChannels,
      count: count
    }
  } catch (error) {
    throw new Error(String(error))
  }
}

export const getAllLiveChannels = async ({
  skip = 0,
  take = 20
}: Pagination): Promise<ChannelsReturn> => {
  try {
    const currentUser = await getCurrentUser()
    const [channels, count] = await db.$transaction([
      db.channel.findMany({
        take,
        skip: skip * take,
        where: {
          live: true,
          AND: [
            {
              NOT: {
                ownerId: currentUser?.id || undefined,
                owner: {
                  deactivated: true
                }
              }
            }
          ]
        },
        select: {
          owner: {
            include: {
              profile: true
            }
          },
          ownerId: true,
          live: true,
          name: true,
          stream_category: true,
          description: true,
          subscribers: true,
          stream_title: true,
          stream_viewers: true,
          stream_game: true,
          stream_thumbnail: true,
          stream_started_at: true,
          stream_ended_at: true,
          followers: true,
          categories: true
        }
      }),
      db.channel.count({
        where: {
          live: true,
          AND: [
            {
              NOT: {
                ownerId: currentUser?.id || undefined,
                owner: {
                  deactivated: true
                }
              }
            }
          ]
        }
      })
    ])

    if (!channels || channels.length === 0)
      return {
        data: [],
        count: 0
      }

    return {
      data: channels,
      count: count
    }
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
