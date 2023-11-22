// screen
import Nav from '@/components/screens/nav'
import { Suspense } from 'react'

export const metadata = {
  title: 'Twitch Clone',
  description: 'A Clone of Twitch made with Next.js and TypeScript'
}

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={<div>Loading nav...</div>}>
        <Nav />
      </Suspense>
      <main>{children}</main>
    </>
  )
}
