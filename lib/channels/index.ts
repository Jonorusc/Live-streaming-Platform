'use server'

import { db } from '@/lib/db'
import {
  Channel,
  GAMES_CATEGORIES,
  Profile,
  User,
  Subscriber,
  Follower,
  Stream
} from '@prisma/client'
import { getCurrentUser } from '@/actions/user'

export type Pagination = {
  skip?: number
  take?: number
}

export type CLIENT_CHANNEL = Channel & {
  owner: User & { profile: Profile | null }
} & {
  stream: Omit<
    Stream,
    'stream_key' | 'stream_server_url' | 'stream_ingress_id'
  > | null
}

export type CHANNEL = {
  id: string
  name: string | null
  description: string | null
  owner: User & { profile: Profile | null }
  ownerId: string | null
  stream: Stream | null
  subscribers: Subscriber[] | null
  followers: Follower[] | null
  categories: GAMES_CATEGORIES[] | null
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
              id: true,
              name: true,
              description: true,
              ownerId: true,
              stream: true,
              subscribers: true,
              followers: true,
              categories: true,
              owner: {
                include: {
                  profile: true
                }
              }
            }
          }
        },
        take,
        skip: skip * take,
        orderBy: [
          {
            channel: {
              stream: {
                live: 'desc'
              }
            }
          },
          {
            channel: {
              stream: {
                stream_viewers: 'desc'
              }
            }
          },
          {
            channel: {
              stream: {
                stream_started_at: 'desc'
              }
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
            stream: {
              stream_viewers: 'desc'
            }
          }
        ],
        where: {
          stream: {
            live: true
          },
          AND: [
            {
              NOT: {
                owner: {
                  deactivated: true
                },
                ownerId: currentUser?.id || undefined,
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
          id: true,
          owner: {
            include: {
              profile: true
            }
          },
          ownerId: true,
          name: true,
          stream: true,
          description: true,
          subscribers: true,
          followers: true,
          categories: true
        }
      }),
      db.channel.count({
        where: {
          stream: {
            live: true
          },
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
          stream: {
            live: true
          },
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
          id: true,
          owner: {
            include: {
              profile: true
            }
          },
          ownerId: true,
          name: true,
          description: true,
          subscribers: true,
          stream: true,
          followers: true,
          categories: true
        }
      }),
      db.channel.count({
        where: {
          stream: {
            live: true
          },
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
