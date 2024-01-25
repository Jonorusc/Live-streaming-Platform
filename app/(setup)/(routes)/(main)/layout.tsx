import Flex from '@/components/ui/flex'
import Nav from '../../_components/nav'
import { Suspense } from 'react'
import LoadingAside from '../../_components/aside/loading'
import LoadingNav from '../../_components/nav/loading'
import UserAside from '../../_components/aside'

export const metadata = {
  title: 'Twitch Clone',
  description: 'A Clone of Twitch made with Next.js and TypeScript',
  openGraph: {
    type: 'website',
    site_name: 'Twitch Clone',
    images: [
      {
        url: 'https://res.cloudinary.com/jaumlu/image/upload/v1688753296/y2xixoqgvt3zdkhkhl3s.png',
        alt: 'DevByLucas'
      }
    ]
  }
}

export default async function MainLayout({
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
            <UserAside />
          </Suspense>
          {children}
        </Flex>
      </main>
    </>
  )
}
