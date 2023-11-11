import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  const token = cookies().get('user_token_id')

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const firebase_id = token.value

  try {
    const user = await db.user.findUnique({
      select: {
        id: true,
        username: true,
        email: true,
        last_login: true,
        profile: true,
        channel: true,
        follows: true,
        subscriptions: true,
        email_verified: true,
        created_at: true,
        updated_at: true
      },
      where: {
        firebase_id: firebase_id
      }
    })
    if (!user) {
      return new NextResponse('Not Found', { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
