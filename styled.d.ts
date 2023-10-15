// styled.d.ts
import 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme {
    name: string
    bodyColor: string
    containerMaxWidth: string
    htmlFontSize: string
    title?: string
    palette: {
      primary: string
      secondary: string
      green: string
      blueGreen: string
      dark: string
      lightGreen: string
      grey: string
      darker: string
      darkenBlue: string
      whiteSmoke: string
      black: string
      error: string
    }
    font: {
      family: string
      size: {
        small: string
        medium: string
        large: string
        xlarge: string
      }
      bold: number
      semiBold: number
      light: number
      normal: number
    }
    border: {
      radius: string
    }
    shadow: {
      text: {
        small: string
        medium: string
        large: string
      }
      box: {
        small: string
        medium: string
        large: string
      }
    }
    spacing: {
      small: string
      medium: string
      large: string
      xlarge: string
    }
    layers: {
      base: number
      menu: number
      overlay: number
      modal: number
      alwaysOnTop: number
    }
  }
}
