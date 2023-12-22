'use client'
import React, { useRef, useState, useLayoutEffect } from 'react'
import * as S from './styles'

import { COLORS } from '@/components/ui/types'

interface Box2DProps {
  $active?: boolean
  $color?: COLORS
  children: React.ReactNode
}

const Box2D = ({ $active, $color = 'accent', children }: Box2DProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const div = contentRef.current
    if (div && children) {
      const { width, height } = div.getBoundingClientRect()
      setSize({ width, height })
    }
  }, [children])

  return (
    <S.Wrapper
      $color={$color}
      $active={$active}
      style={{ width: size.width, height: size.height }}
    >
      <div></div>
      <div></div>
      <div ref={contentRef}>{children}</div>
    </S.Wrapper>
  )
}

export default Box2D
