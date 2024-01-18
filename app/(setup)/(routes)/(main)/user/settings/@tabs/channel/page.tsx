'use client'
import ChannelPage from '@/components/screens/settings/channel'
import SettingsLoading from '@/components/screens/settings/loading'
import { useUser } from '@/hooks/use-user'

export default function Page() {
  const { user, isLoading } = useUser()
  if (!user || isLoading) return <SettingsLoading />
  return <ChannelPage user={user} />
}
