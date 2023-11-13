import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { Wrapper as Button } from '@/components/ui/button/styles'
import Flex from '@/components/ui/flex'

export const ModalSignUp = styled(motion.div).attrs({
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

    @media (max-width: 414px) {
      width: 100%;
    }

    form {
      ${Button}:not([type='submit']) {
        &:hover {
          color: ${theme.palette.text.label};
          transition: background 100ms ease-in;
        }
      }
      & > ${Flex} {
        @media (max-width: 414px) {
          flex-direction: column;
          row-gap: 1.3rem;
          ${Button} {
            width: 100%;
          }
        }
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
