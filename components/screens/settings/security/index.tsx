'use client'

import { CURRENTUSER } from '@/actions/user'
import UserSecurityPage from './security'
import UserContactPage from './contact'
import { useState } from 'react'

const SecurityPage = ({ user }: { user: CURRENTUSER }) => {
  const [showMask, setShowMask] = useState(true)

  return (
    <>
      <UserContactPage
        user={user}
        setShowMask={setShowMask}
        showMask={showMask}
      />
      <UserSecurityPage user={user} showMask={showMask} />
    </>
  )
}
export default SecurityPage
