import { Suspense } from 'react'
import Nav from '../../_components/nav/creator'
import Flex from '@/components/ui/flex'
import CreatorAside from '../../_components/aside/creator'
import LoadingAside from '../../_components/aside/loading'
import LoadingNav from '../../_components/nav/loading'

export const metadata = {
  title: 'Creator - Twitch Clone'
}

export default function CreatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={<LoadingNav />}>
        <Nav />
      </Suspense>
      <main>
        <Flex>
          <Suspense fallback={<LoadingAside />}>
            <CreatorAside />
          </Suspense>
          {children}
        </Flex>
      </main>
    </>
  )
}
