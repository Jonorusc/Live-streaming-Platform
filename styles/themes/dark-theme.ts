// components/themes/darkTheme.tsx
import { DefaultTheme } from 'styled-components'
export const darkTheme: DefaultTheme = {
  name: 'dark',
  bodyColor: 'colour here',
  containerMaxWidth: '120rem',
  htmlFontSize: '62.5%', // 1rem = 10px
  palette: {
    primary: '#F2F4F9',
    secondary: '#2094FD',
    green: '#31C975',
    blueGreen: '#00A19D',
    dark: '#344352',
    lightGreen: '#D4F4E2',
    grey: '#B4BDC7',
    darker: '#141C22',
    darkenBlue: '#194B78',
    whiteSmoke: '#f5f5f5',
    black: '#000000',
    error: '#FFCCCC'
  },
  font: {
    family: 'Open Sans, sans-serif',
    size: {
      small: '1.2rem',
      medium: '2.4rem',
      large: '3.2rem',
      xlarge: '4rem'
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
