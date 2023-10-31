import styled, { css } from 'styled-components'

import type {
  WIDTH,
  HEIGHT,
  JUSTIFY,
  ALIGN,
  PLACEITEMS
} from '@/components/ui/types'

const Grid = styled.div<{
  $columns?: string
  $rows?: string
  $placeItems?: PLACEITEMS
  $justify?: JUSTIFY
  $align?: ALIGN
  $gap?: string
  $gapX?: string
  $gapY?: string
  $padding?: string
  $margin?: string
  $width?: WIDTH
  $height?: HEIGHT
}>`
  ${({
    $columns,
    $rows,
    $placeItems,
    $justify,
    $align,
    $gap,
    $gapX,
    $gapY,
    $padding,
    $margin,
    $width,
    $height
  }) => css`
    display: grid;
    gap: ${$gap || '0'};
    row-gap: ${$gapX || '0'};
    column-gap: ${$gapY || '0'};
    padding: ${$padding || '0'};
    margin: ${$margin || '0'};
    width: ${$width || 'auto'};
    height: ${$height || 'auto'};

    ${!!$columns && `grid-template-columns: ${$columns};`}
    ${!!$rows && `grid-template-rows: ${$rows};`};
    ${!!$placeItems && `place-items: ${$placeItems};`}
    ${!!$justify && `justify-content: ${$justify};`}
    ${!!$align && `align-items: ${$align};`}

    @media screen and (max-width: 414px) {
      width: 100%;
    }
  `}
`

export default Grid
