import {
  getFollowedChannels,
  getMostViewedChannels
} from '@/actions/(routes)/main'
import { getCurrentUser } from '@/actions/user'
import AsideWrapper from './wrapper'

const UserAside = async () => {
  const [user, vewedChannels] = await Promise.all([
    getCurrentUser(),
    getMostViewedChannels({
      skip: 0,
      take: 10
    })
  ])

  const followedChannels = user
    ? await getFollowedChannels({
        userId: user?.id!
      })
    : null

  return (
    <>
      <AsideWrapper
        vewedChannels={vewedChannels}
        followedChannels={followedChannels || null}
      />
    </>
  )
}

export default UserAside
