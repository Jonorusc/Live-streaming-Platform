import Flex from '@/components/ui/flex'
import { Tabs } from '@/components/ui/tab'
import Typrography from '@/components/ui/typography'
import CustomScrollBar from '@/components/ui/custombar'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/actions/user'
import { Container } from '@/components/ui/container'

export default async function UserSettingsLayout({
  tabs
}: {
  tabs: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) return redirect('/')

  return (
    <>
      <CustomScrollBar>
        <Container>
          <Flex $direction="column" $gapX="1rem" $padding="3rem 3rem 0 3rem">
            <Tabs $fontSize="medium" $separator={false}>
              <Link href="stream">stream</Link>
              <Link href="brand">brand</Link>
            </Tabs>
          </Flex>
          <Flex $direction="column" $gapX="1rem" $padding="2rem 3rem 3rem 3rem">
            <Flex $direction="column" $gapX="1rem" $height="100dvh">
              {tabs}
            </Flex>
          </Flex>
        </Container>
      </CustomScrollBar>
    </>
  )
}
