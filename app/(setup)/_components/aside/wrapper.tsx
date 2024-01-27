'use client'

import { CHANNELS } from '@/actions/(routes)/main'
import { CURRENTUSER } from '@/actions/user'
import Aside from '@/components/ui/aside'
import MostViewed from './most-viewed'
import FollowedChanels from './followed-channels'
import { useReadLocalStorage } from 'usehooks-ts'

const AsideWrapper = ({
  vewedChannels,
  followedChannels
}: {
  vewedChannels: CHANNELS | null
  followedChannels: CHANNELS | null
  user?: CURRENTUSER | null
}) => {
  const collapsed = useReadLocalStorage<boolean>('aside-collapsed') || false

  return (
    <>
      <Aside
        $title="For You"
        $collapsed={collapsed}
        $width="24rem"
        $collapsedWidth="5rem"
      >
        <FollowedChanels channels={followedChannels} collapsed={collapsed} />
        <MostViewed channels={vewedChannels} collapsed={collapsed} />
      </Aside>
    </>
  )
}

export default AsideWrapper
