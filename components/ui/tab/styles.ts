import styled, { css } from 'styled-components'

export const TabContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    box-shadow: inset 0px -1px 0px ${theme.name === 'light' ? '#adadb859' : '#53535f7a'};

    ul {
      display: flex;
      width: 100%;
      padding: 0;
      margin: 0;

      li {
        margin-right: 2rem;
        list-style: none;
      }
    }

    a {
      display: inline-flex;
      width: fit-content;
      color: ${theme.palette.text.base};
      font-size: calc(${theme.font.size.xsmall} + 0.1rem);
      text-transform: capitalize;
      padding: 0.5rem 0;
      flex: 1;
      line-height: 1.5;

      &:hover {
        text-decoration: none;
        box-shadow: inset 0px -1px 0px ${theme.palette.accent};
        color: ${theme.palette.accent};
      }

      &.active {
        box-shadow: inset 0px -1px 0px ${theme.palette.primary};
        color: ${theme.palette.primary};
      }
    }
  `};
`
export const Tab = styled.div``
