import SecurityPage from '@/components/screens/settings/security'
import { getCurrentUser, CURRENTUSER } from '@/actions/user'

export default async function Page() {
  const user = (await getCurrentUser()) as CURRENTUSER

  return <SecurityPage user={user} />
}
