import { Suspense } from 'react'
import ChannelSkeleton from '@/components/screens/channel/loading'

export type Props = {
  children: React.ReactNode
  params: {
    channel_name: string
  }
}
export async function generateMetadata({ params }: Props) {
  const channel_name = params.channel_name

  return {
    title: `${channel_name} - Twitch Clone`,
    description: `Watch ${channel_name} on Twitch Clone`
  }
}

export default async function ChannelLayout({ children }: Props) {
  return <Suspense fallback={<ChannelSkeleton />}>{children}</Suspense>
}
