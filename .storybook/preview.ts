import type { Preview } from '@storybook/react'
import { withThemeFromJSXProvider } from '@storybook/addon-styling'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../styles/themes/default-theme'
import { darkTheme } from './../styles/themes/dark-theme'
import GlobalStyles from '../styles/themes/global-styles'

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export const decorators = [
  withThemeFromJSXProvider({
    themes: { light: defaultTheme, dark: darkTheme },
    Provider: ThemeProvider,
    GlobalStyles: GlobalStyles
  })
]

export default preview
