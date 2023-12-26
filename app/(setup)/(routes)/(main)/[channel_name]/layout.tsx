import { Suspense } from 'react'
import ChannelSkeleton from '@/components/screens/channel/loading'

export type Props = {
  children: React.ReactNode
  params: {
    channel_name: string
  }
}

export default async function ChannelLayout({ children }: Props) {
  return <Suspense fallback={<ChannelSkeleton />}>{children}</Suspense>
}
