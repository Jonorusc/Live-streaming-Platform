import styled, { css } from 'styled-components'

export const ModalWrapper = styled.div`
  ${({ theme }) => css`
    background-color: rgba(0, 0, 0, 0.75);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* blur filter */
    backdrop-filter: blur(0.2rem);

    > div {
      background-color: ${theme.palette.background};
      position: relative;
      border-radius: 0.4rem;
      z-index: ${theme.layers.alwaysOnTop};
    }
  `}
`
