'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

type Props = {
  params: {
    channel_name: string
    params: string[]
  }
}

export default function ChannelPage({ params }: Props) {
  const router = useRouter()
  const done = useRef(false)

  useEffect(() => {
    if (params.channel_name && !done.current) {
      done.current = true
      router.push(`/${params.channel_name}`)
    }
  }, [params, router])
}
