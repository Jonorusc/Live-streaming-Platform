import { Suspense } from 'react'
import Nav from '../../_components/nav/creator'
import Flex from '@/components/ui/flex'
import CreatorAside from '../../_components/aside/creator'
import LoadingAside from '../../_components/aside/loading'

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
      <Suspense fallback={<div>Loading nav...</div>}>
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
