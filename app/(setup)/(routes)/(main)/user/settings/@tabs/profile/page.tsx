'use client'
import SettingsLoading from '../../_components/loading'
import ProfilePage from '../../_components/profile'
import { useUser } from '@/hooks/use-user'

export default function Page() {
  const { user, isLoading } = useUser()
  if (!user || isLoading) return <SettingsLoading />
  return <ProfilePage user={user} />
}
