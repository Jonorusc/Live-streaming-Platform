'use client'

import { CURRENTUSER } from '@/actions/user'
import UserSecurityPage from './security'
import UserContactPage from './contact'
import { useState } from 'react'

const SecurityPage = ({ user }: { user: CURRENTUSER }) => {
  const [showMask, setShowMask] = useState(true)

  return (
    <section>
      <UserContactPage
        user={user}
        setShowMask={setShowMask}
        showMask={showMask}
      />
      <UserSecurityPage user={user} showMask={showMask} />
    </section>
  )
}
export default SecurityPage
