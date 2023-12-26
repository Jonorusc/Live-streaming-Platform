import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const ModalForgotPassword = styled(motion.div).attrs({
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

    form {
      margin-top: ${theme.spacing.large};
    }
  `}
`
