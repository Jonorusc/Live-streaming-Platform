import styled, { css } from 'styled-components'
import { TabsProps } from '.'

export const TabContainer = styled.div<Omit<TabsProps, 'children'>>`
  ${({ theme, $separator, $fontSize }) => css`
    width: 100%;
    ${$separator &&
    css`
      box-shadow: inset 0px -1px 0px ${theme.name === 'light' ? '#adadb859' : '#53535f7a'};
    `}

    ul {
      display: flex;
      width: 100%;
      padding: 0;
      margin: 0;

      li {
        margin-right: 2rem;
        list-style: none;
        position: relative;

        .underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0.1rem;
          background-color: ${theme.palette.primary};
          ${$fontSize === 'medium' &&
          css`
            height: 0.3rem;
            bottom: -0.1rem;
          `}
        }
      }
    }

    a {
      display: inline-flex;
      width: fit-content;
      color: ${theme.palette.text.base};
      ${$fontSize === 'small' &&
      css`
        font-size: calc(${theme.font.size.xsmall} + 0.1rem);
      `}
      ${$fontSize === 'medium' &&
      css`
        font-size: calc(${theme.font.size.small} + 0.2rem);
        font-weight: ${theme.font.semiBold};
      `}
      
      text-transform: capitalize;
      padding: 0.5rem 0;
      flex: 1;
      line-height: 1.5;

      &:hover {
        text-decoration: none;
        /* box-shadow: inset 0px -1px 0px ${theme.palette.accent}; */
        color: ${theme.palette.accent};
      }

      &.active {
        /* box-shadow: inset 0px -1px 0px ${theme.palette.primary}; */
        color: ${theme.palette.primary};
      }
    }
  `};
`
export const Tab = styled.div``
