import ProfilePage from '@/components/screens/settings/profile'
import { getCurrentUser, CURRENTUSER } from '@/actions/user'

export default async function Page() {
  const user = (await getCurrentUser()) as CURRENTUSER

  return <ProfilePage user={user} />
}
