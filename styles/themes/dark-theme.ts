import { DefaultTheme } from 'styled-components'
export const darkTheme: DefaultTheme = {
  name: 'dark',
  containerMaxWidth: '136.6rem',
  htmlFontSize: '62.5%', // 1rem = 10px
  palette: {
    text: {
      base: '#efeff1',
      secondary: '#adadb8',
      label: '#f7f7f8'
    },
    background: '#0e0e10',
    surface: '#1f1f23',
    primary: '#9147ff',
    secondary: '#41a564',
    analogous1: '#9147ff',
    analogous2: '#4164a5',
    triadic1: '#2f2f35',
    triadic2: '#efeff1',
    splitComplementary1: '#41a564',
    splitComplementary2: '#a56441',
    green: '#31C975',
    lightGreen: '#D4F4E2',
    blueGreen: '#00A19D',
    dark: '#18181b',
    darker: '#0e0e10',
    darkGrey: '#adadb838',
    darkerGrey: '#0a0a0b',
    grey: '#adadb8',
    lightGrey: '#d3d3d3',
    darkenBlue: '#194B78',
    whiteSmoke: '#f5f5f5',
    white: '#ffffff',
    black: '#000000',
    red: '#bb1411',
    warn: '#ffd37a',
    info: '#1f69ff',
    success: '#00f593',
    error: '#eb0400',
    accent: '#bf94ff',
    transparent: 'transparent'
  },
  font: {
    family: 'Inter, Open Sans ,sans-serif',
    size: {
      xsmall: '1.3rem',
      small: '1.6rem',
      medium: '2.4rem',
      large: '3.2rem',
      xlarge: '3.6rem'
    },
    bold: 700,
    semiBold: 600,
    light: 500,
    normal: 400
  },
  border: {
    radius: '3rem'
  },
  shadow: {
    text: {
      small: '2px 2px 2px',
      medium: '4px 4px 4px',
      large: '6px 6px 6px'
    },
    box: {
      small: '1px 1px 15px -4px',
      medium: '1px 1px 9px 0px',
      large: '1px 1px 13px 3px'
    }
  },
  spacing: {
    xsmall: '0.4rem',
    small: '0.8rem',
    medium: '1.6rem',
    large: '2.4rem',
    xlarge: '13rem'
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  }
}
