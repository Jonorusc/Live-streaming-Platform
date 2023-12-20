import * as S from './styles'

import ProfilePicturePage from './profile-picture'

import Typrography from '@/components/ui/typography'
import { CURRENTUSER } from '@/actions/user'

const ProfilePage = async ({ user }: { user: CURRENTUSER }) => {
  return (
    <>
      <Typrography
        $color="triadic2"
        $text="Profile Picture"
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
        $margin="0 0 1rem 0"
      />
      <ProfilePicturePage user={user} />
    </>
  )
}

export default ProfilePage
