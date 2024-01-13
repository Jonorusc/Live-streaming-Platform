import styled, { css } from 'styled-components'
import { lighten } from 'polished'

import { TyprographyProps } from '@/components/ui/typography'

import type { COLORS } from '@/components/ui/types'

type WrapperProps = Omit<TyprographyProps, 'children'>

export const Wrapper = styled.span<WrapperProps>`
  ${({
    theme,
    $bgcolor,
    $hoverColor,
    $color,
    $fontSize,
    $fontWeight,
    $align,
    $width,
    $margin,
    $padding,
    $position,
    $top,
    $left,
    $bottom,
    $lineHeight,
    $right,
    $border,
    $borderColor,
    $borderSize,
    $breakWord,
    $radius
  }) => css`
    border: none;
    display: block;
    margin: 0;
    ${$border &&
    css`
      ${$borderColor
        ? css`
            border: ${`${$borderSize ?? Number(1)}px`} solid
              ${theme.palette[$borderColor as COLORS]};
          `
        : css`
            border: ${`${$borderSize ?? Number(1)}px`} solid
              ${theme.palette.primary};
          `};
    `};

    ${$bgcolor &&
    css`
      background-color: ${lighten(0.1, theme.palette[$bgcolor as COLORS])};
    `};
    ${$radius &&
    css`
      border-radius: ${$radius};
    `};
    ${$color &&
    css`
      color: ${theme.palette[$color]};
    `};
    ${!!$fontSize &&
    css`
      font-size: ${theme.font.size[$fontSize]};
    `};
    ${!!$lineHeight &&
    css`
      line-height: ${$lineHeight};
    `};
    ${!!$fontWeight &&
    css`
      font-weight: ${theme.font[$fontWeight]};
    `};
    ${!!$align &&
    css`
      text-align: ${$align};
    `};
    ${$margin &&
    css`
      margin: ${$margin};
    `};
    ${$padding &&
    css`
      padding: ${$padding};
    `};

    width: ${$width || 'auto'};
    word-break: ${$breakWord || 'normal'};

    ${!!$position &&
    css`
      position: ${$position};

      ${!!$top &&
      css`
        top: ${$top};
      `};

      ${!!$left &&
      css`
        left: ${$left};
      `};

      ${!!$bottom &&
      css`
        bottom: ${$bottom};
      `};

      ${!!$right &&
      css`
        right: ${$right};
      `};
    `}

    &:hover {
      ${$hoverColor &&
      css`
        color: ${theme.palette[$hoverColor]};
      `}
    }
  `};
`
