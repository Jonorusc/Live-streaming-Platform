import { getMostViewedChannels } from '@/lib/channels'
import AsideWrapper from './wrapper'

const UserAside = async () => {
  const pagination = { skip: 0, take: 10 }
  const [mostViewedChannels] = await Promise.all([
    getMostViewedChannels(pagination)
  ])

  return (
    <>
      <AsideWrapper mostViewedChannels={mostViewedChannels} />
    </>
  )
}

export default UserAside
