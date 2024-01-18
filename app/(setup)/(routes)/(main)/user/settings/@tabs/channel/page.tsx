'use client'
import ChannelPage from '../../_components/channel'
import SettingsLoading from '../../_components/loading'
import { useUser } from '@/hooks/use-user'

export default function Page() {
  const { user, isLoading } = useUser()
  if (!user || isLoading) return <SettingsLoading />
  return <ChannelPage user={user} />
}
