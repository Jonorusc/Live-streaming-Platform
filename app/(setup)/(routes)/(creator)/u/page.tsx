import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/actions/user'

import NotVerified from '@/app/(setup)/_components/not-verified'

export default async function CreatorPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  if (!user?.email_verified) return <NotVerified />

  /*
    This 'CreatorPage' is the home page for the user's creator dashboard. So feel free to add any components you want to display here.
    I'm using 'redirect' because I don't have any ideia and even what to put here. I'm just redirecting the user to the settings page.
    But you can add any component you want here.
  */

  redirect(`/u/settings`)
}
