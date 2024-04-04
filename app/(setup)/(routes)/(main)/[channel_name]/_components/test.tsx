'use client'

import { useRef } from 'react'
import useStream from '@/hooks/use-stream'
import { CURRENTUSER } from '@/actions/user'

export default function Test({
  channel_name,
  user
}: {
  channel_name: string
  user: CURRENTUSER | null
}) {
  const broadcasting = useRef<HTMLVideoElement>(null)
  const { status } = useStream({
    channel_name,
    videoElement: broadcasting.current
  })

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${user?.profile?.background_image})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-y',
          height: '100vh',
          width: '100%'
        }}
      >
        <div
          style={{
            backgroundColor: '#000',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            width: '100%',
            height: 'calc(100vh - 23rem)'
          }}
        >
          {status !== 'Streaming' && <div>{status}</div>}
          {status === 'Streaming' && (
            <video
              ref={broadcasting}
              style={{ aspectRatio: '16/9', maxWidth: '100%' }}
            />
          )}
        </div>
      </div>
    </>
  )
}
