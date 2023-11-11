'use client'

import { AnimatePresence } from 'framer-motion'
import * as S from './styles'

import { COLORS } from '@/components/ui/types'

export type ToolTipProps = {
  $position?: 'top' | 'right' | 'bottom' | 'left'
  $background?: COLORS
  children: React.ReactNode
  $content: React.ReactNode
}

const ToolTip = ({
  children,
  $background,
  $position,
  $content
}: ToolTipProps) => {
  return (
    <S.Wrapper>
      {children}
      <AnimatePresence>
        <S.ToolTip $position={$position} $background={$background}>
          {$content}
        </S.ToolTip>
      </AnimatePresence>
    </S.Wrapper>
  )
}

export default ToolTip
