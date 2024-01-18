'use client'

import { CURRENTUSER } from '@/actions/user'
import NotVerified from './not-verified'
import ChannelColor from './channel-color'
import StreamKeys from './stream-keys'

const ChannelPage = ({ user }: { user: CURRENTUSER }) => {
  if (!user.email_verified) return <NotVerified />

  return (
    <section>
      <ChannelColor user={user} />
      <StreamKeys user={user} />
    </section>
  )
}
export default ChannelPage
