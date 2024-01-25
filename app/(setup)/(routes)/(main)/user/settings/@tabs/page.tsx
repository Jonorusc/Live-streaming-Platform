import { getCurrentUser } from '@/actions/user'
import { redirect } from 'next/navigation'

export default async function UserTabsIndex() {
  const user = await getCurrentUser()

  if (!user) return redirect('/')

  redirect(`/user/settings/profile`)
}
