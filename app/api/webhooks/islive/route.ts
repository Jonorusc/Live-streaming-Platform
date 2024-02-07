import { WebhookReceiver } from 'livekit-server-sdk'
import { pusherServer } from '@/lib/pusher'

import { db } from '@/lib/db'

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
)

export async function POST(req: Request) {
  const body = await req.text()
  const authorization = req.headers.get('Authorization')

  if (!authorization) {
    return new Response('No authorization header', { status: 400 })
  }

  const event = receiver.receive(body, authorization, true)

  if (!event) {
    return new Response('Invalid signature', { status: 400 })
  }
  if (event.event === 'ingress_started') {
    const channel = await db.channel.update({
      where: {
        stream_ingress_id: event.ingressInfo?.ingressId
      },
      data: {
        live: true,
        streaming_title: 'Master player playing league of legends',
        streaming_game: 'League of Legends',
        streaming_started_at: new Date(),
        streaming_viewers: 40200
      },
      select: {
        live: true,
        name: true,
        owner: {
          include: {
            profile: {
              select: {
                avatar: true
              }
            }
          }
        },
        streaming_category: true,
        description: true,
        subscribers: true,
        streaming_title: true,
        streaming_viewers: true,
        streaming_game: true,
        streaming_thumbnail: true,
        streaming_started_at: true,
        streaming_ended_at: true,
        followers: true,
        categories: true
      }
    })

    if (channel) {
      pusherServer.trigger('channel', 'live', channel)
    }
  }

  if (event.event === 'ingress_ended') {
    const channel = await db.channel.update({
      where: {
        stream_ingress_id: event.ingressInfo?.ingressId
      },
      data: {
        live: false,
        streaming_thumbnail: null,
        streaming_viewers: 0,
        streaming_ended_at: new Date(),
        streaming_game: null
      }
    })

    if (channel) pusherServer.trigger('channel', 'live_ended', channel)
  }

  return new Response('Received', { status: 200 })
}
