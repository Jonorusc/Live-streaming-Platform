'use client'
import * as S from '../styles'

import { CURRENTUSER } from '@/actions/user'
import NotVerified from './not-verified'

const ChannelPage = ({ user }: { user: CURRENTUSER }) => {
  if (!user.email_verified) return <NotVerified />

  return <>{user.username}</>
}
export default ChannelPage
