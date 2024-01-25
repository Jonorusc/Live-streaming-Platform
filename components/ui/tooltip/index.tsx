'use client'

import * as S from './styles'

import { COLORS } from '@/components/ui/types'
import NoSsr from '@/components/NoSsr'
import { useEffect, useRef, useState } from 'react'
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
  const anchor = useRef<HTMLDivElement>(null)
  const tooltip = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState({ left: '0px', top: '0px' })

  if (!window) {
    return null
  }

  useEffect(() => {
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

    const clean = autoUpdate(anchor.current, tooltip.current, updatePosition)
  }, [])
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
