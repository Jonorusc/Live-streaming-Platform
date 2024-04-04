'use client'

import {
  TrackReference,
  useConnectionState,
  useRemoteParticipant,
  useTracks
} from '@livekit/components-react'

import { ConnectionState, Track, type Participant } from 'livekit-client'

export function toString(connectionState: string) {
  switch (connectionState) {
    case 'connected':
      return 'Connected!'
    case 'connecting':
      return 'Connecting...'
    case 'disconnected':
      return 'Disconnected'
    case 'reconnecting':
      return 'Reconnecting'
    default:
      return 'Unknown'
  }
}

export type Stream =
  | 'Stream is offline'
  | 'Loading'
  | 'Connected!'
  | 'Connecting...'
  | 'Disconnected'
  | 'Reconnecting'
  | 'Unknown'
  | 'Streaming'

type Props = {
  status: Stream
  participant?: Participant
  tracks?: TrackReference[]
}

export default function useStream({
  channel_name,
  videoElement = null
}: {
  channel_name: string
  videoElement?: HTMLVideoElement | null
}): Props {
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(channel_name)
  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone])
  const streamer_tracks = tracks.filter(
    (track) => track.participant.identity === channel_name
  )
  let status: Stream = 'Unknown'
  if (connectionState !== ConnectionState.Connected || !participant) {
    status =
      connectionState === ConnectionState.Connected
        ? 'Stream is offline'
        : toString(connectionState)
  } else if (streamer_tracks.length === 0) {
    status = 'Loading'
  } else {
    tracks
      .filter((track) => track.participant.identity === participant.identity)
      .forEach((track) => {
        if (videoElement) {
          track.publication.track?.attach(videoElement)
        }
      })
    status = 'Streaming'
  }

  return {
    status,
    participant,
    tracks
  }
}
