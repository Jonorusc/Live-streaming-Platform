import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    select {
      /* appearance: none; */
      background-color: ${theme.palette.surface};
      border: 0.1rem solid ${theme.palette.lightGrey};
      border-radius: 0.4rem;
      color: ${theme.palette.text.label};
      font-size: ${theme.font.size.small};
      padding: ${theme.spacing.xsmall} 0;
      width: 100%;

      &:focus,
      &:active {
        outline: solid 0.2rem ${theme.palette.primary};
        outline-offset: -0.1rem;
        border-color: ${theme.palette.primary};
        box-shadow:
          0 0 0 0.2rem ${theme.palette.primary},
          inset 0 0 0 0.2rem ${theme.palette.primary};
      }
    }
  `}
`
