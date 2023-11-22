'use client'

import { DefaultTheme } from 'styled-components'
import { Figure } from './styles'
import { useReadLocalStorage } from 'usehooks-ts'
import NoSsr from '@/components/NoSsr'

export type SVGTYPES = 'fail' | 'success' | 'warning' | 'info'

export type SVGProps = {
  $type: SVGTYPES
  $size?: number
}

export const Responses = ({ $type, $size = 18 }: SVGProps) => {
  const theme: DefaultTheme | null = useReadLocalStorage('theme')

  const colors = {
    fail: theme?.colors?.error || '#eb0400',
    success: theme?.colors?.success || '#00f593',
    warning: theme?.colors?.warning || '#fba12e',
    info: theme?.colors?.info || '#1f69ff'
  }

  switch ($type) {
    case 'fail': {
      return (
        <NoSsr>
          <Figure $fillColor={colors.fail}>
            <svg width={$size} height={$size} viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm12 1V9H6v2h8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Figure>
        </NoSsr>
      )
    }
    case 'success': {
      return (
        <NoSsr>
          <Figure $fillColor={colors.success}>
            <svg width={$size} height={$size} viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3 5 1.5 1.5L9 14l-3.5-3.5L7 9l2 2 4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Figure>
        </NoSsr>
      )
    }
    case 'warning': {
      return (
        <NoSsr>
          {' '}
          <Figure $fillColor={colors.warning}>
            <svg
              width={$size}
              height={$size}
              viewBox="0 0 20 20"
              x="0px"
              y="0px"
            >
              <g>
                <path
                  fillRule="evenodd"
                  d="M10.954 3.543c-.422-.724-1.486-.724-1.908 0l-6.9 11.844c-.418.719.11 1.613.955 1.613h13.798c.844 0 1.373-.894.955-1.613l-6.9-11.844zM11 15H9v-2h2v2zm0-3H9V7h2v5z"
                  clipRule="evenodd"
                ></path>
              </g>
            </svg>
          </Figure>
        </NoSsr>
      )
    }
    case 'info': {
      return (
        <NoSsr>
          <Figure $fillColor={colors.info}>
            <svg height={$size} viewBox="0 0 48 48" width={$size}>
              <path d="M0 0h48v48h-48z" fill="none" />
              <path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm2 30h-4v-12h4v12zm0-16h-4v-4h4v4z" />
            </svg>
          </Figure>
        </NoSsr>
      )
    }
    default: {
      return null
    }
  }
}
