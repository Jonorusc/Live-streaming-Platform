import { NextResponse } from 'next/server'
import { getFollowedChannels } from '@/lib/channels'

export async function GET(req: Request) {
  const url_params = new URL(req.url).searchParams
  const take = url_params.get('take')
  const skip = url_params.get('skip')

  try {
    const channels = await getFollowedChannels({
      skip: skip ? parseInt(skip) : 0,
      take: take ? parseInt(take) : 10
    })
    const data = channels.data
    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
