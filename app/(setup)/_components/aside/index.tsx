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
    async () => {
      if (!user) return Promise.resolve(null)
      return await getFollowedChannels({
        userId: user?.id!
      })
    }
  ])

  const follows = await followedChannels()

  return (
    <>
      <AsideWrapper
        vewedChannels={vewedChannels}
        followedChannels={follows || null}
      />
    </>
  )
}

export default UserAside
