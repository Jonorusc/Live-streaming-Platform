'use client'
import SettingsLoading from '@/components/screens/settings/loading'
import SecurityPage from '@/components/screens/settings/security'

import { useUser } from '@/hooks/use-user'

export default function Page() {
  const { user, isLoading } = useUser()
  if (!user || isLoading) return <SettingsLoading />
  return <SecurityPage user={user} />
}
