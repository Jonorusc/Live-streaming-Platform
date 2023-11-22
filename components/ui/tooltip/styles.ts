import styled, { css } from 'styled-components'
import { ToolTipProps } from '.'

export const ToolTip = styled.div<
  Pick<ToolTipProps, '$background' | '$position' | '$arrow'>
>`
  ${({ theme, $background, $position, $arrow }) => css`
    display: none;
    position: absolute;
    max-height: 10.2rem;
    min-height: fit-content;
    min-width: fit-content;
    max-width: 24.2rem;
    text-align: start;
    word-wrap: break-word;
    padding: ${theme.spacing.small};
    border-radius: 0.6rem;
    box-shadow: ${theme.shadow.box.small} rgba(0, 0, 0, 0.45);
    transition: all 150ms ease-in;

    ${$position === 'top' &&
    css`
      bottom: calc((100% + 1.5rem));
      left: 50%;
      translate: -50%;
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
      top: calc((100% + 1.5rem));
      left: 50%;
      translate: -50%;
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
      top: 50%;
      right: calc((100% + 1.5rem));
      translate: 0 -50%;
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
      top: 50%;
      left: calc((100% + 1.5rem));
      translate: 0 -50%;
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
      ${ToolTip} {
        display: block;
      }
    }
  `};
`
