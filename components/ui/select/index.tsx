import * as S from './styles'

export type SelectProps = {
  options: (
    | {
        label: string
        value: string | number
      }
    | string
  )[]
  name: string
  value?: string | number
  label?: string
  onChange?: (value?: string | number) => void
  placeholder?: string
}

const Select = ({
  onChange,
  options,
  name,
  placeholder,
  value,
  label
}: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value
    if (onChange) {
      onChange(newValue)
    }
  }
  return (
    <S.Wrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <select name={name} id={name} value={value} onChange={handleChange}>
        {placeholder && <option value={undefined}>{placeholder}</option>}
        {options.map((option, index) => (
          <option
            key={index}
            value={typeof option === 'string' ? option : option.value}
          >
            {typeof option === 'string' ? option : option.label}
          </option>
        ))}
      </select>
    </S.Wrapper>
  )
}

export default Select
