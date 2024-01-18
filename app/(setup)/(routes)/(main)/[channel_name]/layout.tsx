import { Suspense } from 'react'
import ChannelLoading from './_components/loading'

export type Props = {
  children: React.ReactNode
  params: {
    channel_name: string
  }
}

export default async function ChannelLayout({ children }: Props) {
  return <Suspense fallback={<ChannelLoading />}>{children}</Suspense>
}
