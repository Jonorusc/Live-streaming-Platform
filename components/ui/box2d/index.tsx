'use client'
import React from 'react'
import * as S from './styles'

import { COLORS } from '@/components/ui/types'

interface Box2DProps {
  $active?: boolean
  $color?: COLORS
  children: React.ReactNode
}

const Box2D = ({ $active, $color = 'accent', children }: Box2DProps) => {
  return (
    <S.Box $color={$color} $active={$active}>
      {children}
    </S.Box>
  )
}

export default Box2D
