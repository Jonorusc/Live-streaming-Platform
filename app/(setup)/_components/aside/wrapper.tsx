'use client'

import { ChannelsReturn } from '@/lib/channels'
import { CURRENTUSER } from '@/actions/user'
import Aside from '@/components/ui/aside'
import MostViewed from './most-viewed'
import FollowedChanels from './followed-channels'
import { useReadLocalStorage } from 'usehooks-ts'
import { useUser } from '@/hooks/use-user'

const AsideWrapper = ({
  mostViewedChannels
}: {
  mostViewedChannels: ChannelsReturn
}) => {
  const { user } = useUser()
  const collapsed = useReadLocalStorage<boolean>('aside-collapsed') || false

  return (
    <>
      <Aside
        $title="For You"
        $collapsed={collapsed}
        $width="24rem"
        $collapsedWidth="5rem"
      >
        {user && <FollowedChanels collapsed={collapsed} />}
        <MostViewed channels={mostViewedChannels} collapsed={collapsed} />
      </Aside>
    </>
  )
}

/*

  `FollowedChanels` It uses the `useFollowedChannels` hook to get the user's followed channels and displays them in the aside

  'MostViewed' always brings the first 10 channels with the most viewers 
  taking into account the user's followed channels so that it takes especially those that the user does not follow
*/

export default AsideWrapper
