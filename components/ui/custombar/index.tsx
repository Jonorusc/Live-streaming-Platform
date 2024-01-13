'use client'
import NoSsr from '@/components/NoSsr'
import { Scrollbars } from 'react-custom-scrollbars-2'

export type CustomScrollBarProps = {
  height?: string
  children: React.ReactNode
}

const CustomScrollBar = ({
  height = '100%',
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
        height={height}
        autoHeightMax="100vh"
        renderThumbHorizontal={({ style, ...props }) => {
          const thumbStyle = {
            backgroundColor: `rgba(255,255,255,0.3)`
          }
          return <div style={{ ...style, ...thumbStyle }} {...props} />
        }}
        renderThumbVertical={({ style, ...props }) => {
          const thumbStyle = {
            backgroundColor: `rgba(255,255,255,0.3)`
          }
          return <div style={{ ...style, ...thumbStyle }} {...props} />
        }}
        renderView={({ style, ...props }) => {
          return (
            <div
              style={{
                ...style
              }}
              {...props}
            />
          )
        }}
      >
        {children}
      </Scrollbars>
    </NoSsr>
  )
}

export default CustomScrollBar
