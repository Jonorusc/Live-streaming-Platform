import { getCurrentUser } from '@/actions/user'
import Aside from '@/components/ui/aside'
import Card from '@/components/ui/card'

const UserAside = async () => {
  const user = await getCurrentUser()

  return (
    <>
      <Aside
        $title="For You"
        $collapsed={false}
        $width="24rem"
        $collapsedWidth="4rem"
      >
        <Card
          title={user?.username || 'John Doe'}
          message="League of legends"
          streamer={{
            islive: false,
            name: user?.username || 'John Doe',
            picture: user!.profile!.avatar,
            viewers: 1300
          }}
        />
      </Aside>
    </>
  )
}

export default UserAside
