import * as S from './styles'

import { ZoomIn, ZoomOut } from 'lucide-react'
import { useState } from 'react'

import { COLORS } from '@/components/ui/types'
import Flex from '@/components/ui/flex'

export type SliderProps = {
  showIcons?: boolean
  label?: string
  name: string
  disabled?: boolean
  onChange?: (value: number) => void
  $value?: number
  min: number
  max: number
  step: number
  $color?: COLORS
}
const Slider = ({
  showIcons,
  label,
  name,
  disabled,
  onChange,
  min,
  max,
  step,
  $value,
  $color = 'primary'
}: SliderProps) => {
  const [value, setValue] = useState($value ? $value : min)

  function handleZoomClick(type: 'in' | 'out') {
    let newValue = value

    if (type === 'in') {
      newValue = Math.min(max, value + step)
    } else if (type === 'out') {
      newValue = Math.max(min, value - step)
    }

    // Ensure the value doesn't go below 1
    newValue = Math.max(1, newValue)

    setValue(newValue)
    onChange && onChange(newValue)
  }

  return (
    <S.Wrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <Flex $align="center" $gapY="1rem" $height="2rem">
        {showIcons && (
          <ZoomOut
            onClick={() => {
              handleZoomClick('out')
            }}
          />
        )}
        <S.SliderInput
          disabled={disabled}
          min={min}
          max={max}
          id={name}
          name={name}
          step={step}
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value))
            onChange && onChange(Number(e.target.value))
          }}
          $color={$color}
        />
        {showIcons && (
          <ZoomIn
            onClick={() => {
              handleZoomClick('in')
            }}
          />
        )}
      </Flex>
    </S.Wrapper>
  )
}

export default Slider
