'use client'
import styled, { css } from 'styled-components'

import type {
  WIDTH,
  HEIGHT,
  ALIGN,
  ALIGNCONTENT,
  ALINGSELF,
  DIRECTION,
  DIRECTION_FLOW,
  JUSTIFY,
  COLORS
} from '@/components/ui/types'

const Flex = styled.div<{
  $direction?: DIRECTION
  $flow?: DIRECTION_FLOW
  $align?: ALIGN
  $alingSelf?: ALINGSELF
  $alingContent?: ALIGNCONTENT
  $gap?: string
  $gapX?: string
  $gapY?: string
  $justify?: JUSTIFY
  $padding?: string
  $margin?: string
  $width?: WIDTH
  $height?: HEIGHT
  $background?: COLORS
}>`
  ${({
    theme,
    $direction,
    $flow,
    $align,
    $alingSelf,
    $gap,
    $gapX,
    $gapY,
    $justify,
    $padding,
    $margin,
    $width,
    $height,
    $background
  }) => css`
    display: flex;
    flex-direction: ${$direction || 'row'};
    gap: ${$gap || '0'};
    row-gap: ${$gapX || '0'};
    column-gap: ${$gapY || '0'};
    padding: ${$padding || '0'};
    margin: ${$margin || '0'};
    width: ${$width || 'auto'};
    height: ${$height || 'auto'};
    ${!!$flow && `flex-flow: ${$flow};`}
    ${!!$align && `align-items: ${$align};`}
    ${!!$alingSelf && `align-self: ${$alingSelf};`}
    justify-content: ${$justify || 'unset'};
    background-color: ${theme.palette[$background!] || 'transparent'};

    @media (max-width: 414px) {
      width: 100%;
    }
  `}
`

export default Flex
