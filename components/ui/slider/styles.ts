import styled, { css } from 'styled-components'
import { COLORS } from '../types'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    label {
      font-size: ${theme.font.size.xsmall};
      line-height: 1.2;
      font-weight: ${theme.font.normal};
      color: ${theme.palette.text.base};
    }
    svg {
      stroke: ${theme.palette.grey};
      cursor: pointer;

      &:active {
        stroke: ${theme.palette.lightGrey};
        scale: 0.9;
      }
    }
  `}
`

export const SliderInput = styled.input.attrs({
  type: 'range'
})<{ $width?: string; $height?: string; $color: COLORS }>`
  ${({ theme, $height, $width, $color }) => css`
    width: ${$width || '100%'};
    height: ${$height || '0.25rem'};
    -webkit-appearance: none;
    border-radius: 0.6rem;
    background: ${theme.palette.lightGrey};
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      background: ${theme.palette[$color]};
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      background: ${theme.palette[$color]};
      cursor: pointer;
    }
  `}
`
