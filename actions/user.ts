'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { signup, signout } from '@/lib/firebase/auth'
import { sendemailverification } from '@/lib/firebase/actions'
import { Profile, User, Channel, Follower, Subscriber } from '@prisma/client'

export type UserProps = Omit<User, 'firebase_id' | 'id'> & {
  profile?: Profile | null
  channel?: Channel | null
  follows?: Follower[]
  subscribers?: Subscriber[]
}

export type CURRENTUSER = UserProps & { id: string }

export const getCurrentUser = async (): Promise<CURRENTUSER | null> => {
  let user = null
  const token = cookies().get('user_token_id')

  if (!token) {
    return null
  }

  const firebase_id = token.value

  try {
    user = await db.user.findUnique({
      select: {
        id: true,
        username: true,
        username_updated_at: true,
        email: true,
        last_login: true,
        profile: true,
        channel: true,
        follows: true,
        interested_categories: true,
        uninterested_categories: true,
        subscriptions: true,
        email_verified: true,
        deactivated: true,
        created_at: true,
        updated_at: true
      },
      where: {
        firebase_id
      }
    })
  } catch {
    null
  }

  if (!user) {
    return null
  }

  return user
}

// I'm using an object here to make it easier to add more props later if needed.
export const createUser = async ({
  username,
  email,
  password
}: {
  username: string
  email: string
  password: string
}) => {
  if (!username || !email || !password) {
    throw new Error('Complete all fields')
  }

  try {
    // first create an account with firebase
    const { data: firebaseUser } = await signup(email, password)

    if (!firebaseUser) {
      throw new Error('Internal Error')
    }

    let user = null
    // then create an account with prisma
    user = await db.user.create({
      data: {
        username,
        email,
        firebase_id: firebaseUser.uid,
        profile: {
          create: {
            // avatar generation api
            avatar: `https://api.dicebear.com/7.x/initials/png?seed=${username}`
          }
        }
      }
    })

    if (!user) {
      throw new Error('Internal Error')
    }

    await sendemailverification()

    return user
  } catch {
    throw new Error('Internal Error')
  }
}

// authenticate the user
export const authenticateUser = async (firebase_id: string) => {
  if (!firebase_id) {
    throw new Error('Internal Error')
  }

  let user = null
  try {
    user = await db.user.findUnique({
      where: {
        firebase_id
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    user = await db.user.update({
      where: {
        firebase_id
      },
      data: {
        deactivated: false,
        last_login: new Date()
      }
    })

    if (!user) {
      throw new Error('Internal Error')
    }

    // create the token and set it as a cookie
    // this token is not secure, but it's just for demo purposes
    const token = firebase_id

    cookies().set({
      name: 'user_token_id',
      value: token,
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 2592000 * 1000),
      path: '/'
    })

    return user
  } catch (error) {
    throw new Error('Internal Error')
  }
}

export const signOutUser = async () => {
  try {
    const success = await signout()
    if (!success) {
      throw new Error('Internal Error')
    }
    cookies().delete('user_token_id')

    return success
  } catch {
    throw new Error('Internal Error')
  }
}

export const verifyUserName = async (username: string) => {
  if (!username) {
    throw new Error('Username is required')
  }

  let user = null

  try {
    user = await db.user.findUnique({
      select: {
        username: true
      },
      where: {
        username
      }
    })

    if (!user) {
      return user
    }

    return user
  } catch {
    throw new Error('Internal Error')
  }
}

export const verifyUserEmail = async (email: string) => {
  if (!email) {
    throw new Error('Email is required')
  }
  let user = null
  try {
    user = await db.user.findUnique({
      select: {
        email: true
      },
      where: {
        email
      }
    })

    if (!user) {
      return user
    }

    return user
  } catch {
    throw new Error('Internal Error')
  }
}

export const updateUserEmailStatus = async (
  firebase_email: string,
  status = true
) => {
  if (!firebase_email) {
    throw new Error('Internal Error')
  }
  let user = null
  try {
    user = await db.user.update({
      select: {
        email_verified: true,
        username: true,
        id: true
      },
      where: {
        // notice that we are using email here instead of firebase_id because prisma does not update if there is any '0' at the beginning of the string.
        // So to avoid that we are using email here.
        email: firebase_email
      },
      data: {
        email_verified: status
      }
    })

    if (!user) {
      throw new Error('Internal Error')
    }

    // lets create the user channel as well
    // my logic is: the users can only have one channel wheather they confirmed their email
    let channel = null
    channel = await db.channel.create({
      data: {
        name: user.username,
        ownerId: user.id
      }
    })

    if (!channel) {
      throw new Error('Internal Error')
    }

    return user
  } catch (error) {
    throw new Error('Internal Error')
  }
}

export type RESULT = {
  username: string
  profile: {
    avatar: string
  } | null
  channel: {
    name: string
    live: boolean
  } | null
}[]

export const searchQuery = async (query: string): Promise<RESULT | null> => {
  if (!query) {
    throw new Error('Query is required')
  }

  const currentUser = await getCurrentUser()

  const username: { [key: string]: string } = {
    contains: query,
    mode: 'insensitive'
  }
  if (currentUser) {
    username.not = currentUser.username
  }

  let result = null

  try {
    result = await db.user.findMany({
      where: {
        username: username,
        deactivated: false
      },
      select: {
        username: true,
        profile: {
          select: {
            avatar: true
          }
        },
        channel: {
          select: {
            name: true,
            live: true
          }
        }
      },
      take: 8
    })

    if (result.length === 0) {
      return null
    }

    return result
  } catch (error) {
    throw new Error(String(error))
  }
}

export const getUser = async (username: string): Promise<UserProps | null> => {
  if (!username) {
    throw new Error('Username is required')
  }

  let user = null
  try {
    user = await db.user.findUnique({
      where: {
        username
      },
      select: {
        username: true,
        username_updated_at: true,
        email: true,
        last_login: true,
        profile: true,
        channel: true,
        follows: true,
        interested_categories: true,
        uninterested_categories: true,
        subscriptions: true,
        email_verified: true,
        deactivated: true,
        created_at: true,
        updated_at: true
      }
    })

    if (!user) {
      return null
    }

    return user
  } catch {
    return null
  }
}

export const updateUser = async ({
  username,
  key,
  value
}: {
  username: string
  key?: keyof UserProps
  value: string | Partial<Record<keyof UserProps, any>>
}) => {
  if (!username || !value) {
    throw new Error('Complete all fields')
  }

  try {
    const user = await db.user.update({
      where: {
        username
      },
      data: {
        ...(typeof value === 'object'
          ? value
          : { [key as string]: value as string })
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    revalidatePath('/')
    revalidatePath(`/${username}`)
    revalidatePath(`/user/settings/`)
    return user
  } catch (error) {
    throw new Error(String(error))
  }
}

export const updateUserProfile = async ({
  username,
  key,
  value
}: {
  username: string
  key: keyof Profile
  value: string | Partial<Record<keyof Profile, any>>
}) => {
  if (!username || !value) {
    throw new Error('Complete all fields')
  }

  try {
    const user = await db.user.update({
      where: {
        username
      },
      data: {
        profile: {
          update: {
            data: {
              ...(typeof value === 'object'
                ? value
                : { [key]: value as string })
            }
          }
        }
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    revalidatePath('/')
    revalidatePath(`/${username}`)
    revalidatePath(`/user/settings/`)
    return user
  } catch (error) {
    throw new Error(String(error))
  }
}
