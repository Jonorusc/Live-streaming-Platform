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
    const ingress_id = event.ingressInfo?.ingressId as string
    const channel = await db.stream.update({
      where: {
        stream_ingress_id: ingress_id
      },
      data: {
        stream_title: 'Master player playing league of legends',
        stream_game: 'League of Legends',
        stream_started_at: new Date(),
        stream_viewers: 40200
      },
      select: {
        live: true,
        channel: {
          include: {
            owner: {
              select: {
                profile: true
              }
            }
          }
        },
        stream_category: true,
        stream_title: true,
        stream_viewers: true,
        stream_game: true,
        stream_thumbnail: true,
        stream_started_at: true,
        stream_ended_at: true
      }
    })
    if (channel) {
      pusherServer.trigger('channel', 'live', channel)
    }
  }

  if (event.event === 'ingress_ended') {
    const channel = await db.stream.update({
      where: {
        stream_ingress_id: event.ingressInfo?.ingressId
      },
      data: {
        live: false,
        stream_thumbnail: null,
        stream_viewers: 0,
        stream_ended_at: new Date(),
        stream_game: null
      }
    })
    if (channel) pusherServer.trigger('channel', 'live_ended', channel)
  }

  return new Response('Received', { status: 200 })
}
