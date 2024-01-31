import { Wrapper as Select } from '@/components/ui/select/styles'
import styled, { css } from 'styled-components'

export const IngressWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    /* background-color: ${theme.palette.surface}; */
    padding: 1rem;
    width: 100%;
    border-radius: 0.4rem;
    gap: 1rem;
    margin-bottom: 8rem;

    ${Select} {
      width: 20rem;
    }
  `}
`
