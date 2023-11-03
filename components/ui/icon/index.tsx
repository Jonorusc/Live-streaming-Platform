'use client'
import { Wrapper } from './styles'

import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import ReactLoading from 'react-loading'
import { defaultTheme } from '@/styles/themes/default-theme'

import type { COLORS } from '@/components/ui/types'

import React, { Suspense } from 'react'

export interface IconProps extends Omit<LucideProps, 'color'> {
  name?: keyof typeof dynamicIconImports
  color?: COLORS
}

const Icon = React.memo(({ name, ...props }: IconProps) => {
  if (!name) return null

  const LucideIcon = dynamic(dynamicIconImports[name])

  return (
    <Wrapper color={props.color} size={props.size}>
      <Suspense
        fallback={
          <ReactLoading
            type="spin"
            color={defaultTheme.palette.accent}
            height={16}
            width={16}
          />
        }
      >
        <LucideIcon {...props} />
      </Suspense>
    </Wrapper>
  )
})

Icon.displayName = 'Icon'

export default Icon
