'use client'
import { redirect } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function TabsIndex() {
  const done = useRef(false)

  useEffect(() => {
    if (!done.current) {
      done.current = true
      redirect('/user/settings/profile')
    }
  }, [])
}
