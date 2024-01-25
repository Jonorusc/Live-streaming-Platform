'use client'
import { useUser } from '@/hooks/use-user'
import SettingsLoading from '@/app/(setup)/(routes)/(main)/user/settings/_components/loading'
import StreamPage from '../../_components/stream'

export default function Page() {
  const { user, isLoading } = useUser()
  if (!user || isLoading) return <SettingsLoading />
  return <StreamPage user={user} />
}
