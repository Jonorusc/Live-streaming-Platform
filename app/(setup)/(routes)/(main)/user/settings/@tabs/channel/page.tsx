import { getCurrentUser, CURRENTUSER } from '@/actions/user'
import ChannelPage from '@/components/screens/settings/channel'

export default async function Page() {
  const user = (await getCurrentUser()) as CURRENTUSER

  return <ChannelPage user={user} />
}
