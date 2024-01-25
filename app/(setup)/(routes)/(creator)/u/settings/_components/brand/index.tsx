import { CURRENTUSER } from '@/actions/user'
import ProfilePicturePage from '@/app/(setup)/(routes)/(main)/user/settings/_components/profile/profile-picture'
import ChannelColor from '../../../_components/channel-color'

const BrandPage = ({ user }: { user: CURRENTUSER }) => {
  return (
    <section>
      <ProfilePicturePage user={user} />
      <ChannelColor user={user} />
    </section>
  )
}

export default BrandPage
