'use client'
import { Wrapper } from './styles'

import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import type { COLORS } from '@/components/ui/types'

import React from 'react'
import NoSsr from '@/components/NoSsr'

export interface IconProps extends Omit<LucideProps, 'color'> {
  name?: keyof typeof dynamicIconImports
  color?: COLORS
}

const Icon = React.memo(({ name, ...props }: IconProps) => {
  if (!name) return null

  const LucideIcon = dynamic(dynamicIconImports[name])

  return (
    <NoSsr>
      <Wrapper color={props.color} size={props.size}>
        <LucideIcon {...props} />
      </Wrapper>
    </NoSsr>
  )
})

Icon.displayName = 'Icon'

export default Icon
