import {
  getFollowedChannels,
  getMostViewedChannels
} from '@/actions/(routes)/main'
import { getCurrentUser } from '@/actions/user'
import AsideWrapper from './wrapper'

const UserAside = async () => {
  const [user, initial_mostViewedChannels] = await Promise.all([
    getCurrentUser(),
    getMostViewedChannels({
      skip: 0,
      take: 10
    })
  ])

  const initial_followedChannels = user
    ? await getFollowedChannels({
        userId: user?.id!
      })
    : []

  return (
    <>
      <AsideWrapper
        initial_mostViewedChannels={initial_mostViewedChannels}
        initial_followedChannels={initial_followedChannels}
      />
    </>
  )
}

export default UserAside
