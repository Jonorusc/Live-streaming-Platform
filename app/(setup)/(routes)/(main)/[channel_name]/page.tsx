import { notFound } from 'next/navigation'
import { getUser } from '@/actions/user'

type Props = {
  params: {
    channel_name: string
  }
}

export async function generateMetadata({ params }: Props) {
  const channel_name = params.channel_name
  const user = await getUser(channel_name)
  const isLive = user?.channel?.live
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
          url: `${user ? user.profile?.avatar : ''}`,
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
  const user = await getUser(channel_name)

  if (!user) {
    notFound()
  }

  return <section>{JSON.stringify(user.username)}</section>
}
