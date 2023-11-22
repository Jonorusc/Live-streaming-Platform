import styled, { css, keyframes } from 'styled-components'

import { ANIMATIONS } from '@/components/ui/types'

export const Figure = styled.figure<{
  $fillColor?: string
  $pointer?: boolean
}>`
  ${({ theme, $fillColor, $pointer }) => css`
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    fill: ${$fillColor || theme.palette.primary};
    cursor: ${$pointer ? 'pointer' : 'default'};
  `}
`
const blink = keyframes`
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.35);
  }
  100% {
    transform: scale(1, 1);
  }
`

const animationsModifiers = {
  blink: () => css`
    animation-name: ${blink};
  `
}

export const Svg = styled.svg<{
  $animateonhover?: boolean
  $animationName?: ANIMATIONS
  $elementClass?: string
}>`
  ${({ $animateonhover, $animationName, $elementClass }) => css`
    ${$animateonhover &&
    css`
      .${$elementClass} {
        animation-duration: 0.2s;
        animation-iteration-count: 2;
        ${$animationName &&
        animationsModifiers[
          $animationName as keyof typeof animationsModifiers
        ]()}
        animation-play-state: paused;
        transform-origin: 0% 35%;
        will-change: transform;
      }

      &:hover {
        .${$elementClass} {
          animation-play-state: running;
        }
      }

      /* if is not in hover */
      &:not(:hover) {
        .${$elementClass} {
          animation: none;
        }
      }
    `}
  `}
`
