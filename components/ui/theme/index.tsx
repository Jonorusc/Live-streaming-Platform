'use client'
import { Wrapper, List, ListItem } from './styles'

import { defaultTheme } from '@/styles/themes/default-theme'
import { darkTheme } from '@/styles/themes/dark-theme'
import Icon from '@/components/ui/icon'
import Flex from '@/components/ui/flex'

import useClickOutside from '@/hooks/use-clickoutside'
import useMenuPosition from '@/hooks/use-position'
import { useLocalStorage } from 'usehooks-ts'
import { AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Moon, Sun } from 'lucide-react'

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [, setCurrentTheme] = useLocalStorage('theme', defaultTheme)

  const [position, handleClick] = useMenuPosition(() => setIsOpen(true))

  useClickOutside(wrapperRef, () => {
    setIsOpen(false)
  })

  return (
    <Wrapper onClick={handleClick} ref={wrapperRef}>
      <Flex $align="center" $gapY="1rem">
        <Icon name="sun-moon" size={18} />
        <span>Themes</span>
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <List
            $x={position.x}
            $y={position.y}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <ListItem
              onClick={(e) => {
                e.stopPropagation()
                setCurrentTheme(defaultTheme)
                setIsOpen(false)
              }}
            >
              <Flex $align="center" $gapY="1rem">
                <Sun size={18} />
                <span>Light</span>
              </Flex>
            </ListItem>
            <ListItem
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                setCurrentTheme(darkTheme)
                setIsOpen(false)
              }}
            >
              <Flex $align="center" $gapY="1rem">
                <Moon size={18} />
                <span>Dark</span>
              </Flex>
            </ListItem>
          </List>
        )}
      </AnimatePresence>
    </Wrapper>
  )
}

export default ThemeSwitcher
