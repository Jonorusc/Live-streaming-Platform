import {
  getFollowedChannels,
  getMostViewedChannels
} from '@/actions/(routes)/main'
import { getCurrentUser } from '@/actions/user'
import AsideWrapper from './wrapper'

const UserAside = async () => {
  const user = await getCurrentUser()
  const [vewedChannels, followedChannels] = await Promise.all([
    getMostViewedChannels({
      skip: 0,
      take: 10
    }),
    getFollowedChannels({
      userId: user?.id!
    })
  ])

  return (
    <>
      <AsideWrapper
        vewedChannels={vewedChannels}
        followedChannels={followedChannels}
      />
    </>
  )
}

export default UserAside
