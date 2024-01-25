import { getCurrentUser } from '@/actions/user'
import Aside from '@/components/ui/aside'
import { Menu } from './styles'
import AsideItem from './item'
import { Settings } from 'lucide-react'

const CreatorAside = async () => {
  const user = await getCurrentUser()

  return (
    <>
      <Aside $title="CREATOR DASHBOARD" $collapsed={false}>
        <Menu>
          <AsideItem $href="settings">
            <Settings size={20} />
            <span>Settings</span>
          </AsideItem>
        </Menu>
      </Aside>
    </>
  )
}

export default CreatorAside
