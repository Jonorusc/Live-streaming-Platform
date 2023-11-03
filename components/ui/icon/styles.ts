import styled, { css } from 'styled-components'
import { IconProps } from '.'

export const Wrapper = styled.div<IconProps>`
  ${({ theme, color, size }) => css`
    color: ${color ? theme.palette[color] : theme.palette.text.base};
    height: ${size ? `${size}px` : 'auto'};
  `}
`
