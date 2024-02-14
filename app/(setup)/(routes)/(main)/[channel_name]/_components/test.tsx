'use client'

import {
  StartAudio,
  useConnectionState,
  useRemoteParticipant,
  useTracks
} from '@livekit/components-react'
import { useViewerToken } from '@/hooks/use-token'
import { useUser } from '@/hooks/use-user'
import { useRef } from 'react'
import { ConnectionState, Track, type Participant } from 'livekit-client'

export default function Test({ channel_name }: { channel_name: string }) {
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(channel_name)
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone
  ]).filter((track) => track.participant.identity === channel_name)

  let content = null

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <>offline</>
  } else if (!participant || tracks.length === 0) {
    content = <>loading</>
  } else {
    content = <Test2 participant={participant} />
  }

  return content
}

export const Test2 = ({ participant }: { participant: Participant }) => {
  const broadcasting = useRef<HTMLVideoElement>(null)
  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (broadcasting.current) {
        track.publication.track?.attach(broadcasting.current)
      }
    })

  return (
    <>
      <>
        <div
          style={{
            backgroundColor: '#000',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            height: 'calc(100vh - 23rem)'
          }}
        >
          <video
            ref={broadcasting}
            style={{ aspectRatio: '16/9', maxWidth: '100%' }}
          />
        </div>
      </>
      <StartAudio
        label="Click to allow audio playback"
        className="absolute top-0 h-full w-full bg-black bg-opacity-75 text-white"
      />
    </>
  )
}
