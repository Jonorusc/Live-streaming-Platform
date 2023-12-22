'use client'
import NoSsr from '@/components/NoSsr'
import { Scrollbars } from 'react-custom-scrollbars-2'

export type CustomScrollBarProps = {
  height?: string
  children: React.ReactNode
}

const CustomScrollBar = ({
  height = '100dvh',
  children
}: CustomScrollBarProps) => {
  return (
    <NoSsr>
      <Scrollbars
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        thumbMinSize={30}
        universal
        autoHeight
        autoHeightMin={'100dvh'}
        autoHeightMax={'100vh'}
      >
        {children}
      </Scrollbars>
    </NoSsr>
  )
}

export default CustomScrollBar
