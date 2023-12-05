import Flex from '@/components/ui/flex'
import { Tabs } from '@/components/ui/tab'
import Typrography from '@/components/ui/typography'

import SettingsLoading from '@/components/screens/settings/loading'

import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = {
  title: 'Settings - Twitch Clone'
}

export default function UserSettingsLayout({
  tabs
}: {
  tabs: React.ReactNode
}) {
  return (
    <>
      <Flex $direction="column" $gapX="1rem" $padding="3rem">
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
        </Tabs>
        <Suspense fallback={<SettingsLoading />}>{tabs}</Suspense>
      </Flex>
    </>
  )
}
