export const metadata = {
  title: 'Twitch Clone',
  description: 'A Clone of Twitch made with Next.js and TypeScript'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
