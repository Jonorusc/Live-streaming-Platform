'use client'

import * as S from './styles'

import NoSsr from '@/components/NoSsr'
import { motion } from 'framer-motion'

import { useState, useRef } from 'react'

export type TogglerProps = {
  id: string
  active: boolean
  onSwitch: (model: boolean) => void
}

const Toggler = ({ id, active, onSwitch }: TogglerProps) => {
  const [state, setState] = useState<boolean>(active)
  const ref = useRef<HTMLInputElement>(null)

  return (
    <NoSsr>
      <S.Wrapper
        $isTrue={state}
        onClick={(e) => {
          e.stopPropagation()
          ref.current?.click()
        }}
      >
        <motion.input
          ref={ref}
          type="checkbox"
          layout
          transition={{
            type: 'spring',
            stiffness: 700,
            damping: 30
          }}
          id="id"
          name="id"
          defaultChecked={state}
          onClick={(e) => {
            e.stopPropagation()
          }}
          onChange={(e) => {
            setState(e.target.checked)
            onSwitch(e.target.checked)
          }}
        />
      </S.Wrapper>
    </NoSsr>
  )
}

export default Toggler
