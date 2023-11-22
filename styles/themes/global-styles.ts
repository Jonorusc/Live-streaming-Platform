'use-client'

import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html {
      font-size: ${theme.htmlFontSize};
    }

    body {
      background-color: ${theme.palette.background};
      transition: all 0.5s ease;
      width: 100%;
      overflow: hidden;
      color: ${theme.palette.text.base};
      font-size: ${theme.font.size.small};
      font-family: ${theme.font.family};
      &::-webkit-scrollbar {
        height: 0;
      }
    }

    a {
      text-decoration: none;
      color: ${theme.palette.primary};
      font-size: calc(${theme.font.size.xsmall} - 0.1rem);

      &:hover {
        text-decoration: underline;
      }
    }
  `};

`

export default GlobalStyles
