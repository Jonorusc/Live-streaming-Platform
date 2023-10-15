'use-client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: ${({ theme }) => theme.htmlFontSize};
  }

  body {
    background-color: ${({ theme }) => theme.bodyColor};
    color: ${({ theme }) => theme.palette.primary};
    &::-webkit-scrollbar {
      height: 0;
    }
  }

`

export default GlobalStyles
