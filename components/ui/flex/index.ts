'use client'
import styled, { css } from 'styled-components'

import type {
  WIDTH,
  HEIGHT,
  ALIGN,
  ALIGNCONTENT,
  ALINGSELF,
  DIRECTION,
  JUSTIFY
} from '@/components/ui/types'

const Flex = styled.div<{
  $direction?: DIRECTION
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
}>`
  ${({
    $direction,
    $align,
    $alingSelf,
    $gap,
    $gapX,
    $gapY,
    $justify,
    $padding,
    $margin,
    $width,
    $height
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
    ${!!$align && `align-items: ${$align};`}
    ${!!$alingSelf && `align-self: ${$alingSelf};`}
    justify-content: ${$justify || 'unset'};

    @media screen and (max-width: 414px) {
      width: 100%;
    }
  `}
`

export default Flex
