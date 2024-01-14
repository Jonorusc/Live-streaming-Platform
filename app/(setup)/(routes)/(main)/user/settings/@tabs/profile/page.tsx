'use client'
import SettingsLoading from '@/components/screens/settings/loading'
import ProfilePage from '@/components/screens/settings/profile'
import { useUser } from '@/hooks/use-user'

export default function Page() {
  const { user, isValidating } = useUser()
  if (!user || isValidating) return <SettingsLoading />
  return <ProfilePage user={user} />
}
