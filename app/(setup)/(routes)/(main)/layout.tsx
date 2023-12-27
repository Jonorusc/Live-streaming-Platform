// screen
import Nav from '@/components/screens/nav'
import { Suspense } from 'react'

export const metadata = {
  metadataBase: new URL(
    String(process.env.VERCEL_URL || process.env.NEXT_PUBLIC_URL)
  ),
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
