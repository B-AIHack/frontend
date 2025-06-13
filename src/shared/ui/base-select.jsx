import { Select, Option } from '@ozen-ui/kit/Select'

export const BaseSelect = ({ options, ...rest }) => {
  return (
    <Select {...rest}>
      {options.map(({ value, label }, index) => (
        <Option key={`select-option-${index}`} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
}
