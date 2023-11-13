'use server'

import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { signup, signout } from '@/lib/firebase/auth'
import { sendemailverification } from '@/lib/firebase/actions'

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
    return { error: { message: 'Complete all required fields' } }
  }

  try {
    // first create an account with firebase
    const { data: firebaseUser } = await signup(email, password)

    if (!firebaseUser) {
      return { error: { message: 'Internal Error' } }
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
      return { error: { message: 'Internal Error' } }
    }

    await sendemailverification()

    return user
  } catch {
    return { error: { message: 'Internal Error' } }
  }
}

// authenticate the user
export const authenticateUser = async (firebase_id: string) => {
  if (!firebase_id) {
    return { error: { message: 'Internal Error' } }
  }

  let user = null
  try {
    user = await db.user.findUnique({
      where: {
        firebase_id
      }
    })

    if (!user) {
      return { error: { message: 'Internal Error' } }
    }

    user = await db.user.update({
      where: {
        firebase_id
      },
      data: {
        last_login: new Date()
      }
    })

    if (!user) {
      return { error: { message: 'Internal Error' } }
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
    return { error: { message: error } }
  }
}

export const signOutUser = async () => {
  try {
    const success = await signout()
    if (!success) {
      return { error: { message: 'Internal Error' } }
    }
    cookies().delete('user_token_id')

    return success
  } catch {
    return { error: { message: 'Internal Error' } }
  }
}

export const verifyUserName = async (username: string) => {
  if (!username) {
    return { error: { message: 'Internal Error' } }
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
    return { error: { message: 'Internal Error' } }
  }
}

export const verifyUserEmail = async (email: string) => {
  if (!email) {
    return { error: { message: 'Internal Error' } }
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
    return { error: { message: 'Internal Error' } }
  }
}

export const updateUserEmailStatus = async (firebase_email: string) => {
  if (!firebase_email) {
    return { error: { message: 'Internal Error' } }
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
        email_verified: true
      }
    })

    if (!user) {
      return { error: { message: 'Internal Error' } }
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
      return { error: { message: 'Internal Error' } }
    }

    return user
  } catch (error) {
    return { error: { message: 'Internal Error' } }
  }
}
