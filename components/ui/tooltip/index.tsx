'use client'

import * as S from './styles'

import { COLORS } from '@/components/ui/types'
import NoSsr from '@/components/NoSsr'
import { useLayoutEffect, useRef, useState } from 'react'
import { computePosition, flip, offset, autoUpdate } from '@floating-ui/dom'

export type ToolTipProps = {
  $position?: 'top' | 'right' | 'bottom' | 'left'
  $background?: COLORS
  children: React.ReactNode
  $content: React.ReactNode
  $arrow?: boolean
  $show?: boolean
}

const ToolTip = ({
  children,
  $background,
  $position,
  $content,
  $arrow,
  $show = true
}: ToolTipProps) => {
  if (window === undefined) {
    return null
  }
  const anchor = useRef<HTMLDivElement>(null)
  const tooltip = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState({ left: '0px', top: '0px' })

  useLayoutEffect(() => {
    if (!anchor.current || !tooltip.current) return
    const updatePosition = () => {
      if (!anchor.current || !tooltip.current) return
      computePosition(anchor.current, tooltip.current, {
        placement: $position || 'right',
        middleware: [offset(10), flip()]
      }).then(({ x, y }) => {
        setPositions({
          left: `${x}px`,
          top: `${y}px`
        })
      })
    }

    autoUpdate(anchor.current, tooltip.current, updatePosition)
  }, [anchor, tooltip, $position])
  return (
    <NoSsr>
      <S.Wrapper ref={anchor}>
        {children}
        {$show && (
          <S.ToolTip
            ref={tooltip}
            $position={$position}
            $background={$background}
            $arrow={$arrow}
            style={{
              ...positions
            }}
          >
            {$content}
          </S.ToolTip>
        )}
      </S.Wrapper>
    </NoSsr>
  )
}

export default ToolTip
