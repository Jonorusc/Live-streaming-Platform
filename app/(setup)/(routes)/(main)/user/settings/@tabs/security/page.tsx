'use client'
import SecurityPage from '@/components/screens/settings/security'
import { useUser } from '@/hooks/use-user'

export default function Page() {
  const { user } = useUser()
  if (!user) return null
  return <SecurityPage user={user} />
}
