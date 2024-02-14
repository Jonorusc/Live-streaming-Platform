import { CURRENTUSER, getCurrentUser } from '@/actions/user'
import StreamKeyPreferences from './stream-key-preferences'
import CreateIngress from './create-ingress'
import { getChannelByName } from '@/actions/channel'

const StreamPage = async () => {
  const user = await getCurrentUser()
  if (!user) return null
  const channel = await getChannelByName(user.username)
  if (!channel) return null
  return (
    <section>
      {!channel!.stream?.stream_key ? (
        // client component
        <CreateIngress
          channel={{
            id: channel.id,
            name: channel.name as string
          }}
        />
      ) : (
        // server component (I don't want to pass these keys to the client side)
        <StreamKeyPreferences
          channel={{
            id: channel.id,
            name: channel.ownerId as string,
            stream_server_url: channel.stream.stream_server_url,
            stream_key: channel.stream.stream_key
          }}
        />
      )}
    </section>
  )
}

export default StreamPage
