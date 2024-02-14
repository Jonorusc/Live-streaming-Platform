import { notFound } from 'next/navigation'
import { getChannelByName } from '@/actions/channel'
import Page from './_components'

type Props = {
  params: {
    channel_name: string
  }
}

export async function generateMetadata({ params }: Props) {
  const channel_name = params.channel_name
  const channel = await getChannelByName(channel_name)
  const isLive = channel?.stream?.live || false
  const description = isLive
    ? `${channel_name} is live on Twitch Clone. Watch ${channel_name}'s stream now.`
    : `Watch ${channel_name} on Twitch Clone`

  return {
    openGraph: {
      title: `${channel_name} - Twitch Clone`,
      description,
      siteName: 'Twitch Clone',
      images: [
        {
          url: `${channel ? channel.owner.profile?.avatar : ''}`,
          width: 800,
          height: 600
        }
      ],
      type: 'website'
    }
  }
}

export default async function ChannelPage({ params }: Props) {
  const channel_name = params.channel_name
  const channel = await getChannelByName(channel_name)

  if (!channel) {
    notFound()
  }

  return (
    <>
      <Page channel_name={channel_name} />
    </>
  )
}
