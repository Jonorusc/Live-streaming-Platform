'use client'

import { lighten } from 'polished'
import styled, { css } from 'styled-components'

export const Skeleton = styled.div<{
  $margin?: string
  $width?: string
  $height?: string
  $radius?: string
}>`
  ${({ theme, $width, $height, $margin, $radius }) => css`
    background: ${theme.name === 'dark'
      ? lighten(0.2, theme.palette.dark)
      : lighten(0.4, theme.palette.grey)};
    border-radius: ${$radius || '0.5rem'};
    height: ${$height || '1rem'};
    ${$margin &&
    css`
      margin: ${$margin};
    `}
    width: ${$width || '100%'};
  `}
`
