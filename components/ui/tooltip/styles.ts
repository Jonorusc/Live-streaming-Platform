import styled, { css } from 'styled-components'
import { ToolTipProps } from '.'

export const ToolTip = styled.div<
  Pick<ToolTipProps, '$background' | '$position'>
>`
  ${({ theme, $position, $background }) => css`
    display: none;
    position: absolute;
    max-height: 10.2rem;
    min-height: fit-content;
    min-width: 19rem;
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
    `}
    ${$position === 'bottom' &&
    css`
      top: calc((100% + 1.5rem));
      left: 50%;
      translate: -50%;
    `}

    ${$position === 'left' &&
    css`
      top: 50%;
      right: calc((100% + 1.5rem));
      translate: 0 -50%;
    `}
    ${$position === 'right' &&
    css`
      top: 50%;
      left: calc((100% + 1.5rem));
      translate: 0 -50%;
    `}

    background-color: ${theme.name === 'light'
      ? theme.palette.background
      : theme.palette.surface};

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
