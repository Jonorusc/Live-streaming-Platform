'use client'
import React, { useState, useMemo } from 'react'

import { TEXTFIELD_TYPES, COLORS } from '@/components/ui/types'
import { Responses } from '@/components/ui/logos/svg'
import passwordStrength from '@/utils/password-strength'
import Flex from '@/components/ui/flex'
import Icon from '@/components/ui/icon'

import ReactLoading from 'react-loading'
import { debounce } from 'lodash'

import * as S from './styles'
import NoSsr from '@/components/NoSsr'

// Define the props for the TextField component
export type TextFieldProps = {
  label?: string
  name: string
  type?: TEXTFIELD_TYPES
  $error?: string
  $success?: boolean
  disabled?: boolean
  placeholder?: string
  $response?: boolean
  $bgColor?: COLORS
  required?: boolean
  $handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  $debounce?: number
}

const TextField = React.memo(
  ({
    label,
    name,
    type = 'text',
    $error = '',
    $success = false,
    disabled = false,
    placeholder = '',
    $response = false,
    required = false,
    $bgColor = 'transparent',
    $handleChange = () => {},
    $debounce = 600
  }: TextFieldProps) => {
    // State for loading
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [value, setValue] = useState('')

    // Determine the response status
    const responseStatus = useMemo(() => {
      if (!$response) return null
      if (loading) {
        return (
          <ReactLoading type="spin" color="#B4BDc7" height={16} width={16} />
        )
      } else if ($error) {
        return <Responses $type="fail" />
      } else if ($success && value && type !== 'password' && !$error) {
        return <Responses $type="success" />
      } else if (type === 'password' && !$error && value) {
        const { strength, color } = passwordStrength(value)
        return (
          <Flex $align="center" $gapY="0.5rem" $justify="flex-end">
            {strength === 'Weak' && <Responses $type="fail" />}
            {strength === 'Medium' && <Responses $type="warning" />}
            {strength === 'Strong' && <Responses $type="success" />}
            <S.Span color={color}>{strength}</S.Span>
          </Flex>
        )
      }
      return null
    }, [loading, $error, $success, $response])

    const eyes = useMemo(() => {
      if (type === 'password') {
        return (
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={18}
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          />
        )
      }
      return null
    }, [showPassword, type])

    // Debounce the setLoading function
    const debouncedSetLoading = debounce(() => setLoading(false), 1000)

    // Render the TextField component
    return (
      <NoSsr>
        <S.Wrapper $error={!!$error} $bgColor={$bgColor}>
          {$response && (
            <S.Top>
              {label && <label htmlFor={name}>{label}</label>}
              {responseStatus}
            </S.Top>
          )}
          <Flex
            $align="center"
            $gapY="0.1rem"
            {...(type === 'password' ? { 'aria-label': 'action-button' } : {})}
          >
            <input
              type={type === 'password' && showPassword ? 'text' : type}
              id={name}
              required={required}
              name={name}
              onChange={(e) => {
                $handleChange(e)
                setValue(e.target.value)
                if (!loading) {
                  setLoading(true)
                }

                if (e.target.value.length === 0) {
                  setLoading(false)
                }

                debouncedSetLoading()
              }}
              disabled={disabled}
              placeholder={placeholder}
            />
            {eyes}
          </Flex>
          {$error?.length > 1 && <S.Error>{$error}</S.Error>}
        </S.Wrapper>
      </NoSsr>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
