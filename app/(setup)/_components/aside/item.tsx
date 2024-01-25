'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type ItemProps = {
  $href: string
  children: React.ReactNode
}

const AsideItem = ({ children, $href }: ItemProps) => {
  const selectedId = usePathname().split('/')[2]
  return (
    <Link
      href={`/u/${$href}`}
      className={`${selectedId === $href ? 'active' : ''}`}
    >
      <button>{children}</button>
    </Link>
  )
}

export default AsideItem
