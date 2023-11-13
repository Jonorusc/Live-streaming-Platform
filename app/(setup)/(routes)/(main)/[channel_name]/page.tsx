import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import NoSsr from '@/components/NoSsr'

type Props = {
  params: {
    channel_name: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const channel_name = params.channel_name

  return {
    title: `${channel_name.replace(/^\w/, (c) =>
      c.toUpperCase()
    )} - Twitch Clone`,
    description: `Watch ${channel_name} on Twitch Clone`
  }
}

export default function StreamPage({ params }: Props) {
  const channel = true

  if (!channel) {
    notFound()
  }

  return (
    <main>
      <NoSsr>{params.channel_name}</NoSsr>
    </main>
  )
}
