import {
  getFollowedChannels,
  getMostViewedChannels
} from '@/actions/(routes)/main'
import AsideWrapper from './wrapper'

const UserAside = async () => {
  const pagination = { skip: 0, take: 10 }
  const [mostViewedChannels, followedChannels] = await Promise.all([
    getMostViewedChannels(pagination),
    getFollowedChannels(pagination)
  ])

  return (
    <>
      <AsideWrapper
        mostViewedChannels={mostViewedChannels}
        followedChannels={followedChannels}
      />
    </>
  )
}

export default UserAside
