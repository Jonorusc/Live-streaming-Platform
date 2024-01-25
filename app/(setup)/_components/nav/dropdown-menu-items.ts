'use client'

import {
  UserMinus2,
  Settings,
  LucideIcon,
  SunMoon,
  Home,
  PlusSquare,
  ArrowLeftFromLine
} from 'lucide-react'

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
  view?: 'creator' | 'user'
}

export const dropdownItems: DropdownItem[] = [
  {
    id: '0',
    title: 'Back to Twitch',
    Icon: Home,
    link: '/',
    auth: true,
    view: 'creator'
  },
  {
    id: '1',
    title: 'Channel',
    Icon: UserMinus2,
    auth: true
  },
  {
    id: '2',
    title: 'Creator Dashboard',
    Icon: PlusSquare,
    link: '/u',
    auth: true,
    view: 'user'
  },

  {
    id: '3',
    title: 'Settings',
    Icon: Settings,
    link: '/user/settings',
    auth: true
  },
  {
    id: '4',
    title: 'Theme',
    Icon: SunMoon,
    auth: false
  },
  {
    separator: true,
    id: '5',
    title: 'Logout',
    Icon: ArrowLeftFromLine,
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
