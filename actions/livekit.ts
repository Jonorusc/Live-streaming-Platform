'use server'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import {
  AccessToken,
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  type CreateIngressOptions
} from 'livekit-server-sdk'
import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models'

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)

export const createStreamerToken = async (channelName: string) => {
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: channelName
    }
  )

  token.addGrant({
    room: channelName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true
  })

  return await Promise.resolve(token.toJwt())
}

export const createViewerToken = async (
  channelRoom: string,
  identity: string
) => {
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: identity
    }
  )

  token.addGrant({
    room: channelRoom,
    roomJoin: true,
    canPublish: false,
    canPublishData: true
  })

  return await Promise.resolve(token.toJwt())
}

export const createIngress = async (
  channelName: string,
  ownerId: string,
  ingressType: IngressInput
) => {
  const options: CreateIngressOptions = {
    name: channelName,
    roomName: channelName,
    participantName: channelName,
    participantIdentity: channelName
  }

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
    }
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    }
  }

  const ingress = await ingressClient.createIngress(ingressType, options)

  try {
    await db.channel.update({
      where: { ownerId },
      data: {
        stream_ingress_id: ingress.ingressId,
        stream_key: ingress.streamKey,
        stream_server_url: ingress.url
      }
    })
  } catch (error) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId)
    }
    throw new Error('Failed to save ingress')
  }
  revalidatePath(`/${channelName}`)
  revalidatePath(`/u/`)
  revalidatePath(`/`)
  return ingress
}

export const resetIngresses = async () => {
  const ingresses = await ingressClient.listIngress({})

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId)
    }
  }
}
