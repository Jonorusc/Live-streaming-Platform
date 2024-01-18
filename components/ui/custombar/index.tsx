'use client'
import NoSsr from '@/components/NoSsr'
import { useReadLocalStorage } from 'usehooks-ts'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { DefaultTheme } from 'styled-components'

export type CustomScrollBarProps = {
  height?: string
  children: React.ReactNode
}

const CustomScrollBar = ({
  height = '100%',
  children
}: CustomScrollBarProps) => {
  const theme: DefaultTheme | null = useReadLocalStorage('theme')

  const renderThumb = ({ style, ...props }: { style: React.CSSProperties }) => {
    const thumbStyle = {
      backgroundColor:
        theme?.name === 'light'
          ? theme?.palette?.lightGrey
          : theme?.palette?.surface,
      borderRadius: '0.5rem',
      cursor: 'pointer'
    }
    return <div style={{ ...style, ...thumbStyle }} {...props} />
  }

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
        renderThumbHorizontal={renderThumb}
        renderThumbVertical={renderThumb}
        renderView={({ style, ...props }) => (
          <div style={{ ...style }} {...props} />
        )}
      >
        {children}
      </Scrollbars>
    </NoSsr>
  )
}

export default CustomScrollBar
