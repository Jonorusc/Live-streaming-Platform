'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { signup, signout } from '@/lib/firebase/auth'
import { sendemailverification } from '@/lib/firebase/actions'
import {
  Profile,
  User,
  Channel,
  Follower,
  Subscriber,
  Stream
} from '@prisma/client'
import { separateByUppercase } from '@/lib/utils/text'

export type UserProps = Omit<User, 'firebase_id' | 'id'> & {
  profile?: Profile | null
  channel?: Channel | null
  follows?: Follower[] | null
  subscribers?: Subscriber[] | null
}

async function getUserCookie() {
  const cookieData = cookies().get('user_token_id')
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}

export type CURRENTUSER = UserProps & { id: string }

export const getCurrentUser = async (): Promise<CURRENTUSER | null> => {
  try {
    const token = cookies().get('user_token_id')
    // const token = (await getUserCookie()) as { value: string }

    if (!token) {
      return null
    }

    const firebase_id = token.value
    const user = await db.user.findUnique({
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

    return user
  } catch {
    return null
  }
}

// I'm using an object here to make it easier to add more props later if needed.
export const createUser = async ({
  username,
  email,
  password,
  profile
}: {
  username: string
  email: string
  password: string
  profile?: Partial<Profile>
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
    const initals = separateByUppercase(username)

    user = await db.user.create({
      data: {
        username,
        email,
        firebase_id: firebaseUser.uid,
        profile: {
          create: {
            ...profile,
            // avatar generation api
            avatar: `https://api.dicebear.com/7.x/initials/png?seed=${initals}`
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

    revalidatePath('/')
    revalidatePath(`/${user.username}`)
    revalidatePath(`/user/settings/`)
    revalidatePath(`/u/`)

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

    revalidatePath('/')
    revalidatePath(`/user/settings/`)

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
    throw new Error('An unexpected error occurred. Please try again later.')
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
      throw new Error('An unexpected error occurred. Please try again later.')
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
      throw new Error('An unexpected error occurred. Please try again later.')
    }

    return user
  } catch (error) {
    throw new Error(String(error))
  }
}

export type RESULT = {
  username: string
  profile: {
    avatar: string
  } | null
  channel: {
    name: string
    stream: {
      live: boolean
    } | null
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
            stream: {
              select: {
                live: true
              }
            }
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

/**
 * Update users from their username.
 *
 * @example
 * ```javascript
 * const data = {
 *   username: 'currentUsername',
 *   value: {
 *     username: 'newUsername',
 *   }
 * }
 * ```
 * Update only one prop
 *
 * ```javascript
 * const data = {
 *  username: 'currentUsername',
 *  key: 'username',
 *  value: 'newUsername'
 * }
 *
 * user = await updateUser(data)
 * console.log(user) // { username: 'newUsername', ... }
 * ```
 */

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
    let data = {
      ...(typeof value === 'object'
        ? value
        : { [key as string]: value as string })
    }
    // verify is the user username was updated if so we need to update the user channel name as well
    // checks if within the value object there is a username prop
    if (
      (typeof value === 'object' && value.hasOwnProperty('username')) ||
      key === 'username'
    ) {
      // here we're verifying if the username is different from the current username
      if (
        (typeof value === 'object' && username !== value.username) ||
        (key === 'username' && username !== value)
      ) {
        // updates the channel name and the username_updated_at
        // search for the user channel
        const channel = await db.channel.findUnique({
          where: {
            name: username
          }
        })
        const name = (
          typeof value === 'object' ? value.username : value
        ) as string
        // mutate the data object to set the changes
        data = {
          ...data,
          username_updated_at: new Date().toISOString()
        }

        if (channel) {
          data = {
            ...data,
            channel: {
              update: {
                name
              }
            }
          }
        }
      }
    }

    const user = await db.user.update({
      where: {
        username
      },
      data
    })

    if (!user) {
      throw new Error('User not found')
    }

    revalidatePath('/')
    revalidatePath(`/${username}`)
    revalidatePath(`/user/settings/`)
    revalidatePath(`/u/`)
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
