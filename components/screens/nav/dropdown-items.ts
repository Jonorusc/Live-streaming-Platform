'use client'

import { UserMinus2, Settings, LogOut, LucideIcon, SunMoon } from 'lucide-react'

import { signOutUser } from '@/actions/user'
import { signout } from '@/lib/firebase/auth'

import { mutate } from 'swr'

export type DropdownItem = {
  separator?: boolean
  id: string
  title: string
  Icon: LucideIcon
  link?: string
  click?: () => void
  auth: boolean
}

export const dropdownItems: DropdownItem[] = [
  {
    id: '1',
    title: 'Channel',
    Icon: UserMinus2,
    auth: true
  },
  {
    id: '2',
    title: 'Settings',
    Icon: Settings,
    link: '/user/settings',
    auth: true
  },
  {
    id: '3',
    title: 'Theme',
    Icon: SunMoon,
    auth: false
  },
  {
    separator: true,
    id: '4',
    title: 'Logout',
    Icon: LogOut,
    click: async () => {
      try {
        await signout()
        await signOutUser()
        mutate('/api/user')
      } catch {
        //
      }
    },
    auth: true
  }
]
