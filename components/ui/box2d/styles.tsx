import styled, { css } from 'styled-components/'
import { COLORS } from '@/components/ui/types'

export const Box = styled.div<{ $active?: boolean; $color: COLORS }>`
  ${({ theme, $active, $color }) => css`
    transition-property: transform;
    transition-timing-function: ease;
    transition-duration: 100ms;
    background-color: ${theme.palette[$color]};
    z-index: 2;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0px;
      height: 0px;
      border-top: 0.6rem solid transparent;
      border-bottom: 0.6rem solid transparent;
      border-right: 0.6rem solid ${theme.palette[$color]};
      transform-origin: left center;
      ${$active
        ? css`
            transform: translate(0.06rem, -0.6rem) scale(1);
          `
        : css`
            transform: translate(0) scale(0);
          `}
      transition-property: transform;
      transition-timing-function: ease;
      transition-duration: 100ms;
    }
    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 0px;
      height: 0px;
      border-left: 0.6rem solid transparent;
      border-right: 0.6rem solid transparent;
      border-top: 0.6rem solid ${theme.palette[$color]};
      transform-origin: center bottom;
      transform: translateX(0.6rem) scale(${$active ? 1 : 0});
      transition-property: transform;
      transition-timing-function: ease;
      transition-duration: 100ms;
    }

    ${$active &&
    css`
      & > div:nth-child(1) {
        transform: translate3d(0.6rem, -0.6rem, 0px);
      }
    `}

    &:hover {
      &::after {
        transform: translate(0.06rem, -0.6rem) scale(1);
        transition-delay: 75ms;
      }
      &::before {
        transform: translate(0.6rem, -0.06rem) scale(1);
        transition-delay: 75ms;
      }
      & > div:nth-child(1) {
        transform: translate3d(0.6rem, -0.6rem, 0px);
        transition-delay: 75ms;
        z-index: 1;
      }
    }
  `}
`
