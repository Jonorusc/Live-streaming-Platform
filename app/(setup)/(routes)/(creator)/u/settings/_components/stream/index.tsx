import { CURRENTUSER } from '@/actions/user'
import StreamKeyPreferences from './stream-key-preferences'
import CreateIngress from './create-ingress'

const StreamPage = ({ user }: { user: CURRENTUSER }) => {
  const { channel } = user
  return (
    <section>
      {!channel!.stream_key ? (
        <CreateIngress channel={channel!} />
      ) : (
        <StreamKeyPreferences channel={channel!} />
      )}
    </section>
  )
}

export default StreamPage
