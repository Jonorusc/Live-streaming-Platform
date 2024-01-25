import styled, { css } from 'styled-components'
import { AsideProps } from '.'
import { motion } from 'framer-motion'
import { darken } from 'polished'

export const Wrapper = styled(motion.aside).attrs({
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: 1
    }
  },
  exit: { opacity: 0, scale: 0.5 }
})<Omit<AsideProps, 'children' | '$title' | '$reverse'>>`
  ${({ theme, $collapsed, $height, $width, $collapsedWidth }) => css`
    min-width: 22rem;
    min-height: 100vh;
    width: ${$width || 'auto'};
    ${$height &&
    css`
      height: ${$height};
    `}
    /* padding: 0.5rem; */
    flex-shrink: 0;
    background-color: ${theme.palette.surface};
    transition: background-color 150ms ease;

    ${$collapsed &&
    css`
      width: ${$collapsedWidth || '6.3rem'};
      min-width: ${$collapsedWidth || '6.3rem'};
      /* padding: 1rem 0.5rem; */
    `}

    @media (max-width: 425px) {
      display: none;
    }

    container-name: aside;
    container-type: size;
    z-index: ${theme.layers.menu};

    @container aside (max-width: 63px) {
      padding: 1rem 0.5rem;
    }
  `}
`

export const Header = styled.div<Pick<AsideProps, '$reverse'>>`
  ${({ theme, $reverse }) => css`
    display: flex;
    width: 100%;
    padding: 0.5rem 1rem;
    align-items: center;
    flex-direction: ${$reverse ? 'row-reverse' : 'row'};
    justify-content: space-between;
    margin-bottom: 0.5rem;

    button {
      outline: none;
      border: none;
      padding: 0.5rem;
      border-radius: 0.4rem;
      flex-shrink: 0;
      height: 3rem;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: background-color 150ms ease;
      background-color: transparent;
      svg {
        stroke: ${theme.palette.text.base};
      }
      &:hover {
        background-color: ${darken(0.05, theme.palette.surface)};
      }
    }

    @container aside (width <= 63px) {
      padding: 0;
      button {
        width: 100%;
        height: 3.5rem;
        &:hover {
          background-color: unset;
        }
      }
    }

    @container aside (width > 222px) {
      h4 {
        font-size: 1.8rem !important;
      }
    }
  `}
`
