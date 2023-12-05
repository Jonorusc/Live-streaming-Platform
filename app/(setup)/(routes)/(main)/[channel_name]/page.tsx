import { notFound } from 'next/navigation'
import { getUser } from '@/actions/user'

type Props = {
  params: {
    channel_name: string
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
