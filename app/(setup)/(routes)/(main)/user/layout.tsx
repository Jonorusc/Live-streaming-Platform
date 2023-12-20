import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/actions/user'

export default async function UserLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) return redirect('/')
  return <>{children}</>
}
