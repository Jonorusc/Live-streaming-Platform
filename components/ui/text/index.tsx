'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { COLORS, TEXTFIELD_TYPES } from '@/components/ui/types'
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
  $value?: string
  $error?: string
  $success?: boolean
  disabled?: boolean
  placeholder?: string
  $response?: boolean
  $bgColor?: COLORS
  required?: boolean
}

const TextField = React.memo(
  ({
    label,
    name,
    $value,
    type = 'text',
    $error = '',
    $success = false,
    disabled = false,
    placeholder = '',
    $response = false,
    $bgColor = 'transparent',
    required = false
  }: TextFieldProps) => {
    // Get the necessary methods from useFormContext
    const { register, watch, setValue, trigger } = useFormContext()

    // Watch the value of the field
    const value = watch(name)

    // State for loading
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [inputValue, setInputValue] = useState($value || '')

    // Update the value of the field
    useEffect(() => {
      setValue(name, value)
      if (value?.length > 0) {
        trigger(name)
      }
    }, [name, value])

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
          <S.Top>
            <label htmlFor={name}>{label}</label>
            {responseStatus}
          </S.Top>
          {type !== 'textarea' ? (
            <Flex
              $align="center"
              $gapY="0.1rem"
              {...(type === 'password'
                ? { 'aria-label': 'action-button' }
                : {})}
            >
              <input
                type={type === 'password' && showPassword ? 'text' : type}
                id={name}
                {...register(name)}
                required={required}
                name={name}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setValue(name, e.target.value)
                  // clearErrors(name)
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
          ) : (
            <div>
              <textarea
                id={name}
                {...register(name)}
                required={required}
                name={name}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setValue(name, e.target.value)
                  // clearErrors(name)
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
            </div>
          )}
          {$error?.length > 1 && <S.Error>{$error}</S.Error>}
        </S.Wrapper>
      </NoSsr>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
