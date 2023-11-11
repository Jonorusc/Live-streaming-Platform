import styled, { css } from 'styled-components'
import { Message as $Message } from '@/components/ui/toast/styles'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    min-width: 24.2rem;
    padding: 0.5rem 1rem;
    background-color: ${theme.palette.surface};
    cursor: pointer;
  `}
`

export const Message = styled($Message)`
  ${({ theme }) => css`
    color: ${theme.palette.grey};
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
