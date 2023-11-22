import styled, { DefaultTheme, css } from 'styled-components'
import { motion } from 'framer-motion'

import { TYPE, POSITION } from '@/hooks/use-toast'

export const Wrapper = styled(motion.div)`
  ${({ theme }) => css`
    cursor: pointer;
    pointer-events: auto;
    z-index: ${theme.layers.alwaysOnTop};
    min-width: 30rem;
    user-select: none;
    border-radius: 0.5rem;
    box-shadow: ${theme.shadow.box.small} rgba(0, 0, 0, 0.45);
    background-color: ${theme.palette.surface};
    @media (max-width: 768px) {
      width: 20rem;
    }
  `};
`

export const WrapperLive = styled(Wrapper)`
  ${({ theme }) => css`
    width: fit-content;
    padding: 1rem;
  `};
`

const colorModifiers = {
  success: (theme: DefaultTheme) => css`
    color: ${theme.palette.success};
  `,
  error: (theme: DefaultTheme) => css`
    color: ${theme.palette.error};
  `,
  warning: (theme: DefaultTheme) => css`
    color: ${theme.palette.warn};
  `,
  info: (theme: DefaultTheme) => css`
    color: ${theme.palette.info};
  `,
  islive: (theme: DefaultTheme) => css`
    color: ${theme.palette.info};
  `
}

export const Body = styled.div<{ $type: TYPE }>`
  ${({ theme, $type }) => css`
    padding: ${theme.spacing.small};
    text-align: left;
    word-wrap: break-word;
    font-weight: ${theme.font.semiBold};
    color: ${theme.palette.text.base};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    h1 {
      margin: 0;
      padding-bottom: 0.5rem;
      line-height: 1.2;
      ${colorModifiers[$type](theme)};
      font-size: ${theme.font.size.medium};
    }
  `};
`

export const ToastContainer = styled.div<{ $position: POSITION }>`
  ${({ theme, $position }) => css`
    display: flex;
    gap: 1rem;
    top: 0;
    position: fixed;
    z-index: ${theme.layers.alwaysOnTop};
    transition: all 0.3s ease-in-out;
    width: 40rem;
    padding: 1rem;
    height: 100vh;
    user-select: none;
    pointer-events: none;
    margin-top: 5rem;

    @media (max-width: 768px) {
      width: 20rem;
    }
    @media (max-width: 414px) {
      width: 100%;
    }

    ${$position.includes('top') &&
    css`
      flex-direction: column;
      ${$position.includes('left')
        ? css`
            align-items: flex-start;
            left: 0;
          `
        : css`
            align-items: flex-end;
            right: 0;
          `}
    `};

    ${$position.includes('bottom') &&
    css`
      flex-direction: column-reverse;

      ${$position.includes('left')
        ? css`
            align-items: flex-start;

            left: 0;
          `
        : css`
            align-items: flex-end;
            right: 0;
          `}
    `};
  `};
`
export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: calc(${theme.font.size.xsmall} + 0.1rem);
    font-weight: ${theme.font.semiBold};
    line-height: 1.2;
    color: ${theme.palette.text.base};
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `};
`

export const Message = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.size.xsmall};
    font-weight: ${theme.font.light};
    color: ${theme.palette.accent};
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `};
`
