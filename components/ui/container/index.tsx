'use client'
import styled, { css } from 'styled-components'

export const Container = styled.div<{
  padding?: string
  margin?: string
  maxWidth?: string
}>`
  ${({ theme, padding, margin, maxWidth }) => css`
    width: 100%;
    max-width: ${maxWidth || theme.containerMaxWidth};
    margin-left: auto;
    margin-right: auto;
    padding-left: ${theme.spacing.small};
    padding-right: ${theme.spacing.small};

    ${!!padding && `padding: ${padding};`}
    ${!!margin && `margin: ${margin};`}
  `}
`
