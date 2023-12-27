'use client'

import * as S from './styles'

import { COLORS } from '@/components/ui/types'
import NoSsr from '@/components/NoSsr'

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
  return (
    <NoSsr>
      <S.Wrapper>
        {children}
        {$show && (
          <S.ToolTip
            $position={$position}
            $background={$background}
            $arrow={$arrow}
          >
            {$content}
          </S.ToolTip>
        )}
      </S.Wrapper>
    </NoSsr>
  )
}

export default ToolTip
