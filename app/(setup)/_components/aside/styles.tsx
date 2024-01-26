'use client'
import { darken } from 'polished'
import styled, { css } from 'styled-components'

export const Menu = styled.div`
  ${({ theme }) => css`
    padding: 0 1rem;

    @container aside (width <= 63px) {
      padding: 0 1rem;
    }
    a {
      color: ${theme.palette.triadic2};
      font-size: ${theme.font.size.small};
      font-weight: ${theme.font.light};
      width: 100%;
      text-decoration: none;

      button {
        cursor: pointer;
        width: 100%;
        border-radius: 0.5rem;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-radius: 0.5rem;
        background: ${darken(0.05, theme.palette.surface)};
        border: none;
        color: ${theme.palette.triadic2};
        font-size: calc(${theme.font.size.xsmall} + 0.1rem);
        font-weight: ${theme.font.light};
        letter-spacing: 0.5pt;
        margin-bottom: 0.5rem;
        svg {
          stroke: ${theme.palette.triadic2};
          font-weight: ${theme.font.semiBold};
        }
      }

      &.active {
        button {
          background-color: ${theme.palette.primary};
          color: ${theme.palette.white};
          svg {
            stroke: ${theme.palette.white};
          }
        }
      }

      @container aside (width <= 63px) {
        button {
          width: 100%;
          justify-content: center;
          span {
            display: none;
          }
        }
      }
    }
  `}
`

export const SkeleletonWrapper = styled.div`
  ${({ theme }) => css`
    border-right: 0.2rem solid
      ${theme.name === 'light' ? 'rgba(0,0,0,.13)' : theme.palette.black};
    box-shadow:
      0px 1px 2px rgba(0, 0, 0, 0.13),
      0px 0px 2px rgba(0, 0, 0, 0.08);
  `};
`
