'use client'

import { LiveKitRoom } from '@livekit/components-react'
import { useViewerToken } from '@/hooks/use-token'
import { useUser } from '@/hooks/use-user'
import Test from './test'

export default function Page({ channel_name }: { channel_name: string }) {
  const { user } = useUser()
  const { storedToken } = useViewerToken(
    channel_name,
    user?.username || 'guest'
  )

  return (
    <section>
      <LiveKitRoom
        token={storedToken}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      >
        <Test channel_name={channel_name} />
      </LiveKitRoom>
    </section>
  )
}
