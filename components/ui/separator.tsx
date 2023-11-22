import styled, { css } from 'styled-components'

export const Separator = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.name === 'light' ? '#adadb859' : '#53535f7a'};
    margin-top: 1rem !important;
    margin-left: 0.5rem !important;
    margin-right: 0.5rem !important;
    padding-bottom: 1rem !important;
  `}
`
