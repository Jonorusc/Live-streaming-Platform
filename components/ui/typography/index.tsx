'use client'

import React from 'react'
import * as S from './styles'

import type {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  PADDING,
  POSITION,
  TYPOGRAPHY_TYPES
} from '@/components/ui/types'

export type TyprographyProps = {
  $bgcolor?: COLORS | undefined
  $hoverColor?: COLORS | undefined
  $color?: COLORS
  $border?: boolean
  $borderColor?: COLORS | undefined
  $borderSize?: number | undefined
  $fontSize?: FONT_SIZE
  $fontWeight?: FONT_WEIGHT
  $type?: TYPOGRAPHY_TYPES
  $width?: string
  $margin?: PADDING | undefined
  $position?: POSITION
  $top?: string
  $right?: string
  $left?: string
  $bottom?: string
  $text?: string
  children?: React.ReactElement<
    | HTMLHeadingElement
    | HTMLParagraphElement
    | HTMLSpanElement
    | HTMLLabelElement
  >
} & React.HTMLAttributes<
  HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | HTMLLabelElement
>
const Typrography = ({
  $bgcolor = undefined,
  $hoverColor = undefined,
  $color = 'primary',
  $border = false,
  $borderColor = undefined,
  $borderSize = undefined,
  $fontSize = 'medium',
  $fontWeight = 'normal',
  $type = 'span',
  $width = 'auto',
  $margin = undefined,
  $position = 'unset',
  $top = 'unset',
  $right = 'unset',
  $left = 'unset',
  $bottom = 'unset',
  $text = undefined,
  children,
  ...props
}: TyprographyProps) => {
  return (
    <S.Wrapper
      as={$type}
      $bgcolor={$bgcolor}
      $hoverColor={$hoverColor}
      $color={$color}
      $border={$border}
      $borderColor={$borderColor}
      $borderSize={$borderSize}
      $fontSize={$fontSize}
      $fontWeight={$fontWeight}
      $width={$width}
      $margin={$margin}
      $position={$position}
      $top={$top}
      $right={$right}
      $left={$left}
      $bottom={$bottom}
      $type={$type}
      {...props}
    >
      <>
        {children && children}
        {$text && $text}
      </>
    </S.Wrapper>
  )
}

export default Typrography
