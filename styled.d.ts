// styled.d.ts
import 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme {
    name: string
    containerMaxWidth: string
    htmlFontSize: string
    palette: {
      text: {
        base: string
        secondary: string
        label: string
      }
      background: string
      surface: string
      primary: string
      secondary: string
      analogous1: string
      analogous2: string
      triadic1: string
      triadic2: string
      splitComplementary1: string
      splitComplementary2: string
      green: string
      lightGreen: string
      blueGreen: string
      dark: string
      darker: string
      darkGrey: string
      grey: string
      lightGrey: string
      darkenBlue: string
      whiteSmoke: string
      white: string
      black: string
      red: string
      warn: string
      info: string
      success: string
      error: string
      accent: string
      transparent: string
    }
    font: {
      family: string
      size: {
        xsmall: string
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
