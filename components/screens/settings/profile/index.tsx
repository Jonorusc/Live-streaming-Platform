import ProfilePicturePage from './profile-picture'
import ProfileSettingsPage from './profile-settings'

import { CURRENTUSER } from '@/actions/user'
import DeactivateAccountPage from './deactivate-account'

const ProfilePage = async ({ user }: { user: CURRENTUSER }) => {
  return (
    <>
      <ProfilePicturePage user={user} />
      <ProfileSettingsPage user={user} />
      <DeactivateAccountPage user={user} />
    </>
  )
}

export default ProfilePage
