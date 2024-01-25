import styled, { css } from 'styled-components'
import { ToolTipProps } from '.'

export const ToolTip = styled.div<
  Pick<ToolTipProps, '$background' | '$position' | '$arrow'>
>`
  ${({ theme, $background, $position, $arrow }) => css`
    display: block;
    pointer-events: none;
    scale: 0.8;
    visibility: hidden;
    translate-z: 0;
    position: fixed;
    max-height: 10.2rem;
    min-height: fit-content;
    min-width: fit-content;
    max-width: max-content;
    text-align: start;
    word-wrap: break-word;
    padding: ${theme.spacing.small};
    border-radius: 0.6rem;
    box-shadow: ${theme.shadow.box.small} rgba(0, 0, 0, 0.45);
    transition:
      scale 100ms cubic-bezier(0.4, 0, 0.2, 1),
      visibility 80ms ease;
    transition-delay: 80ms;
    transform-origin: center center;
    ${$position === 'top' &&
    css`
      // bottom: calc((100% + 1.5rem));
      // left: 50%;
      // translate: -50%;
      // arrow at bottom of tooltip
      &:after {
        content: '';
        position: absolute;
        display: ${$arrow ? 'block' : 'none'};
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0);
        border-left: 0.6rem solid transparent;
        border-right: 0.6rem solid transparent;
        border-top: 0.6rem solid
          ${!$background ? theme.palette.text.base : theme.palette[$background]};
      }
    `}
    ${$position === 'bottom' &&
    css`
      // top: calc((100% + 1.5rem));
      // left: 50%;
      // translate: -50%;
      // arrow at top of tooltip
      &:after {
        content: '';
        position: absolute;
        display: ${$arrow ? 'block' : 'none'};
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, 0);
        border-left: 0.6rem solid transparent;
        border-right: 0.6rem solid transparent;
        border-bottom: 0.6rem solid
          ${!$background ? theme.palette.text.base : theme.palette[$background]};
      }
    `}

    ${$position === 'left' &&
    css`
      // top: 50%;
      // right: calc((100% + 1.5rem));
      // translate: 0 -50%;
      // arrow to the right of the tooltip
      &:after {
        content: '';
        position: absolute;
        display: ${$arrow ? 'block' : 'none'};
        top: 50%;
        left: 100%;
        transform: translate(0, -50%);
        border-top: 0.6rem solid transparent;
        border-bottom: 0.6rem solid transparent;
        border-left: 0.6rem solid
          ${!$background ? theme.palette.text.base : theme.palette[$background]};
      }
    `}
    ${$position === 'right' &&
    css`
      // top: 50%;
      // left: calc((100% + 1.5rem));
      // translate: 0 -50%;
      // arrow to the left of the tooltip
      &:after {
        content: '';
        position: absolute;
        display: ${$arrow ? 'block' : 'none'};
        top: 50%;
        right: 100%;
        transform: translate(0, -50%);
        border-top: 0.6rem solid transparent;
        border-bottom: 0.6rem solid transparent;
        border-right: 0.6rem solid
          ${!$background ? theme.palette.text.base : theme.palette[$background]};
      }
    `}

    background-color: ${theme.palette.text.base};
    color: ${theme.palette.background};

    ${$background &&
    css`
      background-color: ${theme.palette[$background]};
    `}
  `};
`

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;

    &:hover {
      z-index: ${theme.layers.alwaysOnTop};
      ${ToolTip} {
        scale: 1;
        visibility: visible;
        pointer-events: all;
      }
    }
  `};
`
