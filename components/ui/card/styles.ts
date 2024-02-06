import { darken } from 'polished'
import styled, { css } from 'styled-components'
import { Message as $Message } from '@/components/ui/toast/styles'
import { Wrapper as Aside } from '@/components/ui/aside/styles'
export const Wrapper = styled.div`
  ${({ theme }) => css`
    a {
      text-decoration: none !important;
      &:hover {
        text-decoration: none !important;
      }
    }
    @container aside (width <= 63px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`

export const Content = styled.div<{ disabled?: boolean }>`
  ${({ theme, disabled }) => css`
    width: 100%;
    min-width: 24rem;
    padding: 0.5rem 1rem;
    /* background-color: ${theme.palette.surface}; */
    cursor: pointer;

    &:hover {
      ${!disabled &&
      css`
        background-color: ${darken(0.05, theme.palette.surface)};
      `}
    }

    ${disabled &&
    css`
      opacity: 0.5;
    `}

    @container aside (width <= 63px) {
      width: 4rem;
      min-width: unset;
      padding: 0;
      ${Aside} {
        padding: 0.5rem 0 !important;
      }
      &:hover {
        background-color: unset;
      }
      > div {
        justify-content: center;
      }
      div[aria-label='stream-description'] {
        display: none;
      }
    }
  `}
`

export const Message = styled($Message)`
  ${({ theme }) => css`
    color: ${theme.palette.grey};
    @media (max-width: 425px) {
      font-size: 2.7dvw;
    }
  `}
`
export const Counter = styled.div`
  ${({ theme }) => css`
    color: ${theme.palette.text.base};
    display: flex;
    align-items: center;
    height: fit-content;
    min-width: 4rem;
    justify-content: flex-end;

    > i[aria-label='redball'] {
      display: block;
      height: 0.8rem;
      width: 0.8rem;
      clip-path: circle(50%);
      background-color: ${theme.palette.red};
    }

    > span {
      margin-left: 0.5rem;
      font-size: ${theme.font.size.xsmall};
    }
  `}
`
