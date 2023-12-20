'use client'

import styled, { css } from 'styled-components'

export const Section = styled.div`
  ${({ theme }) => css`
    background: ${theme.name === 'dark'
      ? theme.palette.dark
      : theme.palette.white};
    color: ${theme.palette.text.base};
    width: min(100%, 90rem);
    border: 0.1rem solid #adadb859;
    border-radius: 0.4rem;
    padding: 2rem;
  `}
`
