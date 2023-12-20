import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const ModalProfilePicture = styled(motion.div).attrs({
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: 1
    }
  },
  exit: { opacity: 0, scale: 0.5 }
})`
  ${({ theme }) => css`
    position: relative;
    box-sizing: border-box;

    @media screen and (max-width: 414px) {
      width: 100%;
    }
  `}
`

export const DefaultWrapper = styled.div`
  ${({ theme }) => css`
    input {
      display: none !important;
    }
    margin-top: 1rem;
  `}
`

export const Button = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.name === 'dark'
      ? theme.palette.dark
      : theme.palette.white};
    font-size: ${theme.font.size.xsmall};
    color: ${theme.palette.accent};
    font-weight: ${theme.font.semiBold};
    svg {
      stroke: ${theme.palette.accent};
    }
    outline: none;
    border: calc(0.1rem / 2) solid #adadb859;
    width: 100%;
    cursor: pointer;
    border-radius: 0.4rem;
    margin-bottom: 0.5rem;
    transition: background-color 150ms ease-in;

    &:is(:hover, :focus, :active) {
      background-color: ${theme.name === 'dark'
        ? theme.palette.triadic1
        : '#f2f2f2'};
    }
  `}
`

export const EditWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 1rem;
    height: 30rem;
    position: relative;
  `}
`
