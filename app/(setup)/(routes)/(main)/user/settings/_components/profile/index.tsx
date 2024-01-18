import ProfilePicturePage from './profile-picture'
import ProfileSettingsPage from './profile-settings'

import { CURRENTUSER } from '@/actions/user'
import DeactivateAccountPage from './deactivate-account'

const ProfilePage = async ({ user }: { user: CURRENTUSER }) => {
  return (
    <section>
      <ProfilePicturePage user={user} />
      <ProfileSettingsPage user={user} />
      <DeactivateAccountPage user={user} />
    </section>
  )
}

export default ProfilePage
