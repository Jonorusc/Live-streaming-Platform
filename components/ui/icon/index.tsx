import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import styled, { css } from 'styled-components'

import type { COLORS } from '@/components/ui/types'

interface IconProps extends Omit<LucideProps, 'color'> {
  name?: keyof typeof dynamicIconImports
  color?: COLORS
}

const Wrapper = styled.div<IconProps>`
  ${({ theme, color, size }) => css`
    color: ${color ? theme.palette[color] : theme.palette.text.base};
    height: ${size ? `${size}px` : 'auto'};
  `}
`

const Icon = ({ name, ...props }: IconProps) => {
  if (!name) return null

  const LucideIcon = dynamic(dynamicIconImports[name])

  return (
    <Wrapper {...props}>
      <LucideIcon {...props} />
    </Wrapper>
  )
}

export default Icon