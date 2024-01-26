'use client'

import styled, { css } from 'styled-components'
import { Wrapper as TextField } from '@/components/ui/text/styles'
import { Wrapper as Card } from '@/components/ui/card/styles'

export const Preview = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 30rem;
    height: 19rem;
    justify-content: center;
    align-items: center;
    background-color: ${theme.palette.grey};

    svg {
      filter: drop-shadow(-0.7rem 0.8rem 0.3rem ${theme.palette.darker});
    }
  `}
`

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
      display: flex;
      flex-direction: column;
      row-gap: 2rem;
      ${TextField} {
        width: 60%;
        margin-bottom: 0.5rem;

        @media screen and (max-width: 425px) {
          width: 100%;
        }
      }
    }

    [aria-label='stream-title'] {
      @media screen and (max-width: 375px) {
        font-size: 3.2vw;
      }

      @media screen and (max-width: 320px) {
        font-size: 2.9vw;
      }
    }
    [aria-label='stream-game'] {
      @media screen and (max-width: 320px) {
        font-size: 2.8vw;
      }
    }

    div[aria-label='expanded'] {
      width: 100%;
      margin-bottom: 8rem;

      flex-flow: row wrap;
      row-gap: 2rem;
      @media screen and (max-width: 425px) {
        place-content: center;
        width: 100%;

        ${Preview} {
          width: 100%;
          height: 15rem;
        }
      }

      @media screen and (max-width: 325px) {
        ${Card} {
          display: none;
        }
      }
    }

    div[aria-label='section-footer'] {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    [aria-label='btn-actions'] {
      padding: 0.5rem;
      border-radius: 0.4rem;
      cursor: pointer;
      transition: 150ms background-color ease-in;

      &:hover {
        background-color: ${theme.palette.darkGrey};
      }
    }
  `}
`
