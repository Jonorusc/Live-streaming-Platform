'use client'

import { useRef } from 'react'
import useStream from '@/hooks/use-stream'

export default function Test({ channel_name }: { channel_name: string }) {
  const broadcasting = useRef<HTMLVideoElement>(null)
  const { status } = useStream({
    channel_name,
    videoElement: broadcasting.current
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
          {status !== 'Streaming' && <div>{status}</div>}
          {status === 'Streaming' && (
            <video
              ref={broadcasting}
              style={{ aspectRatio: '16/9', maxWidth: '100%' }}
            />
          )}
        </div>
      </>
    </>
  )
}
