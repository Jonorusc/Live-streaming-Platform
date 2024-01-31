'use client'
import { useUser } from '@/hooks/use-user'
import SettingsLoading from '@main/user/settings/_components/loading'
import BrandPage from '../../_components/brand'

export default function Page() {
  const { user, isLoading } = useUser()
  if (!user || isLoading) return <SettingsLoading />
  return <BrandPage user={user} />
}
