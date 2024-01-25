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
      backgroundColor: theme?.palette?.grey,
      borderRadius: '0.5rem'
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
        hideTracksWhenNotNeeded={true}
        autoHeight
        height={height}
        autoHeightMax="100vh"
        renderThumbHorizontal={renderThumb}
        renderThumbVertical={renderThumb}
      >
        {children}
      </Scrollbars>
    </NoSsr>
  )
}

export default CustomScrollBar
