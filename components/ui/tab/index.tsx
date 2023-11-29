'use client'

import * as S from './styles'

import React from 'react'
import { usePathname } from 'next/navigation'
import NoSsr from '@/components/NoSsr'

export const Tabs = ({
  children
}: {
  children: React.ReactElement<HTMLLinkElement>[]
}) => {
  const selectedId = usePathname().split('/').pop()
  return (
    <NoSsr>
      <S.TabContainer>
        <ul>
          {React.Children.map(children, (child, index) => (
            <li key={index}>
              {child.props.href === selectedId
                ? React.cloneElement(child, { className: 'active' })
                : child}
            </li>
          ))}
        </ul>
      </S.TabContainer>
    </NoSsr>
  )
}
