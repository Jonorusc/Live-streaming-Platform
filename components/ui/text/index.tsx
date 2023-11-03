'use client'
import { useEffect, useState, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { TEXTFIELD_TYPES } from '@/components/ui/types'
import { SVGLogo } from '@/components/ui/logos/svg'
import passwordStrength from '@/utils/password-strength'
import Flex from '@/components/ui/flex'

import ReactLoading from 'react-loading'
import { debounce } from 'lodash'

import * as S from './styles'
import React from 'react'

// Define the props for the TextField component
export type TextFieldProps = {
  label: string
  name: string
  type?: TEXTFIELD_TYPES
  $error?: string
  $success?: boolean
  disabled?: boolean
  placeholder?: string
  $response?: boolean
  required?: boolean
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
    required = false
  }: TextFieldProps) => {
    // Get the necessary methods from useFormContext
    const { register, watch, setValue, clearErrors } = useFormContext()

    // Watch the value of the field
    const value = watch(name)

    // State for loading
    const [loading, setLoading] = useState(false)

    // Update the value of the field
    useEffect(() => {
      setValue(name, value)
    }, [name, value])

    // Determine the response status
    const responseStatus = useMemo(() => {
      if (loading) {
        return (
          <ReactLoading type="spin" color="#B4BDc7" height={16} width={16} />
        )
      } else if ($error) {
        return <SVGLogo type="fail" />
      } else if ($success && value && type !== 'password' && !$error) {
        return <SVGLogo type="success" />
      } else if (type === 'password' && !$error && value) {
        const { strength, color } = passwordStrength(value)
        return (
          <Flex $align="center" $gapY="0.5rem">
            {strength === 'Weak' && <SVGLogo type="fail" />}
            {strength === 'Medium' && <SVGLogo type="warning" />}
            {strength === 'Strong' && <SVGLogo type="success" />}
            <S.Span color={color}>{strength}</S.Span>
          </Flex>
        )
      }
      return null
    }, [loading, $error, $success, value])

    // Debounce the setLoading function
    const debouncedSetLoading = debounce(() => setLoading(false), 1000)

    // Render the TextField component
    return (
      <S.Wrapper $error={!!$error}>
        <S.Top>
          <label htmlFor={name}>{label}</label>
          {$response && responseStatus}
        </S.Top>
        <input
          type={type}
          id={name}
          {...register(name)}
          required={required}
          name={name}
          onChange={(e) => {
            setValue(name, e.target.value)
            clearErrors(name)
            if (!loading) {
              setLoading(true)
            }
            debouncedSetLoading()
          }}
          disabled={disabled}
          placeholder={placeholder}
        />
        {$error?.length > 1 && <S.Error>{$error}</S.Error>}
      </S.Wrapper>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
