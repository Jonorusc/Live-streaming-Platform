'use client'

import styled, { css } from 'styled-components'

export const Skeleton = styled.div<{
  $margin?: string
  $width?: string
  $height?: string
}>`
  ${({ theme, $width, $height, $margin }) => css`
    background: ${theme.palette.lightGrey};
    border-radius: 0.5rem;
    height: ${$height || '1rem'};
    ${$margin &&
    css`
      margin: ${$margin};
    `}
    width: ${$width || '100%'};
    margin-bottom: 0.5rem;
  `}
`
