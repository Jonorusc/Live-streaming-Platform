'use server'

import { cookies } from 'next/headers'

import { db } from '@/lib/db'
import { signup } from '@/lib/firebase/auth'

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
        firebase_id: firebaseUser.uid
      }
    })

    if (!user) {
      return { error: { message: 'Internal Error' } }
    }

    cookies().set({
      name: 'user_token_id',
      value: firebaseUser.uid,
      httpOnly: true,
      sameSite: 'strict',
      path: '/'
    })

    return user
  } catch {
    return { error: { message: 'Internal Error' } }
  }
}

// authenticate the user
export const authenticateUser = async (firebase_id: string) => {
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

    cookies().set({
      name: 'user_token_id',
      value: firebase_id,
      httpOnly: true,
      sameSite: 'strict',
      path: '/'
    })

    console.log(cookies().get('user_token_id'))

    if (!user) {
      return { error: { message: 'Internal Error' } }
    }

    return user
  } catch (error) {
    return { error: { message: error } }
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
      return { error: { message: 'Internal Error' } }
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
      return { error: { message: 'Internal Error' } }
    }

    return user
  } catch {
    return { error: { message: 'Internal Error' } }
  }
}
