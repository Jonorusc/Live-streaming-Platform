'use client'

import styled, { css } from 'styled-components'
import { Wrapper as TextField } from '@/components/ui/text/styles'

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
    margin: 1rem 0 4rem 0;
    position: relative;

    form {
      width: 100%;
      margin-bottom: 8rem;
      ${TextField} {
        width: 60%;
        margin-bottom: 0.5rem;
      }
    }

    div[aria-label='section-footer'] {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  `}
`
