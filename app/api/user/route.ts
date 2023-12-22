import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  const token = cookies().get('user_token_id')

  if (!token) {
    return NextResponse.json({ error: { message: 'Unauthorized' } })
  }

  const firebase_id = token.value

  try {
    const user = await db.user.findUnique({
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
