import React from 'react'
import * as S from './styles'

import type {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  PADDING,
  POSITION
} from '@/components/ui/types'

export type ButtonProps = {
  $bgcolor?: COLORS
  $hoverColor?: COLORS
  $color?: COLORS
  $border?: boolean
  $borderColor?: COLORS
  $borderSize?: number
  $fontSize?: FONT_SIZE
  $fontWeight?: FONT_WEIGHT
  type?: 'button' | 'submit' | 'reset'
  $width?: string
  $padding?: PADDING
  $position?: POSITION
  $top?: string
  $right?: string
  $left?: string
  $bottom?: string
  $error?: boolean
  disabled?: boolean
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>
const Button = React.memo(
  ({
    $bgcolor = 'transparent',
    $hoverColor = 'grey',
    $color = 'primary',
    $border = false,
    $borderColor = 'transparent',
    $borderSize = 1,
    $fontSize = 'medium',
    $fontWeight = 'normal',
    type = 'button',
    $width = 'auto',
    $padding = 'small',
    $position = 'unset',
    $top = 'unset',
    $right = 'unset',
    $left = 'unset',
    $bottom = 'unset',
    $error = false,
    disabled = false,
    children
  }: ButtonProps) => {
    return (
      <S.Wrapper
        $bgcolor={$bgcolor}
        $hoverColor={$hoverColor}
        $color={$color}
        $border={$border}
        $borderColor={$borderColor}
        $borderSize={$borderSize}
        $fontSize={$fontSize}
        $fontWeight={$fontWeight}
        type={type}
        $width={$width}
        $padding={$padding}
        $position={$position}
        $top={$top}
        $right={$right}
        $left={$left}
        $bottom={$bottom}
        $error={$error}
        disabled={disabled}
      >
        {children}
      </S.Wrapper>
    )
  }
)

Button.displayName = 'Button'

export default Button
