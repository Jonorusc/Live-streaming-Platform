import { CURRENTUSER } from '@/actions/user'
import ProfilePicturePage from '@main/user/settings/_components/profile/profile-picture'
import ChannelColor from '@creator/u/_components/channel-color'

const BrandPage = ({ user }: { user: CURRENTUSER }) => {
  return (
    <section>
      <ProfilePicturePage user={user} />
      <ChannelColor user={user} />
    </section>
  )
}

export default BrandPage
