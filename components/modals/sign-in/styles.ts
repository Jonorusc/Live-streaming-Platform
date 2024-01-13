import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { Wrapper as Button } from '@/components/ui/button/styles'

export const ModalSignIn = styled(motion.div).attrs({
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

    form {
      ${Button}:not([type='submit']) {
        &:hover {
          color: ${theme.palette.text.label};
          transition: background 100ms ease-in;
        }
      }

      a {
        margin-top: -1.3rem;
        margin-bottom: 1rem;
        align-self: flex-start;
      }
    }

    h4 {
      color: ${theme.palette.text.base};
      font-size: ${theme.font.size.medium};
      line-height: 1.2;
      font-weight: ${theme.font.semiBold};
      margin: 0;

      @media screen and (max-width: 320px) {
        font-size: ${theme.font.size.small};
      }
    }
  `};
`
