'use client'

import { CHANNELS } from '@/actions/(routes)/main'
import { CURRENTUSER } from '@/actions/user'
import Aside from '@/components/ui/aside'
import MostViewed from './most-viewed'
import FollowedChanels from './followed-channels'
import { useReadLocalStorage } from 'usehooks-ts'
import { useChannels } from '@/hooks/use-channels'

const AsideWrapper = ({
  initial_followedChannels,
  initial_mostViewedChannels
}: {
  initial_mostViewedChannels: CHANNELS | []
  initial_followedChannels: CHANNELS | []
  user?: CURRENTUSER | null
}) => {
  const collapsed = useReadLocalStorage<boolean>('aside-collapsed') || false

  const { followedChannels, mostViewed } = useChannels({
    initial_followedChannels,
    initial_mostViewedChannels
  })

  return (
    <>
      <Aside
        $title="For You"
        $collapsed={collapsed}
        $width="24rem"
        $collapsedWidth="5rem"
      >
        <FollowedChanels channels={followedChannels} collapsed={collapsed} />
        <MostViewed channels={mostViewed} collapsed={collapsed} />
      </Aside>
    </>
  )
}

export default AsideWrapper
