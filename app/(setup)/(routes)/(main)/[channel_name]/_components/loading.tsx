'use client'
import NoSsr from '@/components/NoSsr'
import ReactLoading from 'react-loading'

export default function ChannelLoading() {
  return (
    <NoSsr>
      <ReactLoading type="spin" color="#B4BDc7" height={20} width={20} />
    </NoSsr>
  )
}
