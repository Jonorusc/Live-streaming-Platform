import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { signup } from '@/lib/firebase/auth'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const username = searchParams.get('username')
    const email = searchParams.get('email')

    if (!username && !email) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    if (username) {
      const user = await db.user.findUnique({
        where: {
          username
        }
      })

      if (!user) {
        return new NextResponse('Not Found', { status: 404 })
      }

      return NextResponse.json(user)
    } else if (email) {
      const user = await db.user.findUnique({
        where: {
          email
        }
      })

      if (!user) {
        return new NextResponse('Not Found', { status: 404 })
      }

      return NextResponse.json(user)
    }
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json()


    if (!username || !email || !password) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    let user = null

    // first create an account with firebase
    const { data: firebaseUser } = await signup(email, password)

    if(firebaseUser) {
      // then create an account with prisma
      user = await db.user.create({
        data: {
          username,
          email,
          firebase_id: firebaseUser.uid
        }
      })

      if (!user) {
        return new NextResponse('Internal Error', { status: 500 })
      }
    }

    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
