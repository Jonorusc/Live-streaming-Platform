'use client'
import SettingsLoading from '../../_components/loading'
import SecurityPage from '../../_components/security'

import { useUser } from '@/hooks/use-user'

export default function Page() {
  const { user, isLoading } = useUser()
  if (!user || isLoading) return <SettingsLoading />
  return <SecurityPage user={user} />
}
