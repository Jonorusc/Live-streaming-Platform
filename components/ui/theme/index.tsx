'use client'
import { Wrapper } from './styles'

import { defaultTheme } from '@/styles/themes/default-theme'
import { darkTheme } from '@/styles/themes/dark-theme'
import Flex from '@/components/ui/flex'
import NoSsr from '@/components/NoSsr'

import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'
import { Moon } from 'lucide-react'
import Toggler from '@/components/ui/toggler'
import { DefaultTheme } from 'styled-components'
import { useState } from 'react'

const ThemeSwitcher = () => {
  const [, setCurrentTheme] = useLocalStorage('theme', defaultTheme)
  const currentTheme: DefaultTheme | null = useReadLocalStorage('theme')
  const [active] = useState<boolean>(currentTheme?.name === 'dark')
  return (
    <NoSsr>
      <Wrapper>
        <Flex $align="center" $justify="space-between" $width="100%">
          <Flex $align="center" $gapY="0.5rem">
            <Moon size={20} />
            <span>Dark Theme</span>
          </Flex>
          <Toggler
            id="theme-switcher"
            active={active}
            onSwitch={(model) => {
              setCurrentTheme(model ? darkTheme : defaultTheme)
            }}
          />
        </Flex>
      </Wrapper>
    </NoSsr>
  )
}

export default ThemeSwitcher
