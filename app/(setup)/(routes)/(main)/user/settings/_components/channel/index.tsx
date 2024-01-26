'use client'

import { CURRENTUSER } from '@/actions/user'
import NotVerified from '../../../../../../_components/not-verified'
import { redirect } from 'next/navigation'

const ChannelPage = ({ user }: { user: CURRENTUSER }) => {
  if (!user.email_verified) return <NotVerified />

  redirect(`/u/`)
}
export default ChannelPage
