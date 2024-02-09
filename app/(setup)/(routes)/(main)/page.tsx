'use client'

import { useChannels } from '@/hooks/use-channels'

export default function Home() {
  const { channels } = useChannels()
  return (
    <div style={{ padding: '2rem' }}>
      This is how useChannels() works <br />
      <br />
      {channels.length === 0 ? (
        <>There's no one live</>
      ) : (
        <code>{JSON.stringify(channels, null, 2)}</code>
      )}
    </div>
  )
}
