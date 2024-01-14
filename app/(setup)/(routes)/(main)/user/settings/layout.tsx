import Flex from '@/components/ui/flex'
import { Tabs } from '@/components/ui/tab'
import Typrography from '@/components/ui/typography'
import CustomScrollBar from '@/components/ui/custombar'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/actions/user'

export const metadata = {
  title: 'Settings - Twitch Clone'
}

export default async function UserSettingsLayout({
  tabs
}: {
  tabs: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) return redirect('/')

  return (
    <>
      <Flex $direction="column" $gapX="1rem" $padding="3rem 3rem 0 3rem">
        <Typrography
          $color="triadic2"
          $text="Settings"
          $type="h1"
          $fontSize="xlarge"
          $fontWeight="bold"
        />
        <Tabs>
          <Link href="profile">profile</Link>
          <Link href="channel">channel</Link>
          <Link href="security">security and Contact</Link>
        </Tabs>
      </Flex>
      <CustomScrollBar>
        <Flex $direction="column" $gapX="1rem" $padding="2rem 3rem 3rem 3rem">
          <Flex $direction="column" $gapX="1rem" $height="calc(100dvh - 20rem)">
            {tabs}
          </Flex>
        </Flex>
      </CustomScrollBar>
    </>
  )
}
