'use client'

import { AnimatePresence } from 'framer-motion'
import * as S from './styles'

import { COLORS } from '@/components/ui/types'
import NoSsr from '@/components/NoSsr'

export type ToolTipProps = {
  $position?: 'top' | 'right' | 'bottom' | 'left'
  $background?: COLORS
  children: React.ReactNode
  $content: React.ReactNode
  $arrow?: boolean
}

const ToolTip = ({
  children,
  $background,
  $position,
  $content,
  $arrow
}: ToolTipProps) => {
  return (
    <NoSsr>
      <S.Wrapper>
        {children}
        <AnimatePresence>
          <S.ToolTip
            $position={$position}
            $background={$background}
            $arrow={$arrow}
          >
            {$content}
          </S.ToolTip>
        </AnimatePresence>
      </S.Wrapper>
    </NoSsr>
  )
}

export default ToolTip
