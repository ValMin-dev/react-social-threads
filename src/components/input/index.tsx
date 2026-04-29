import { Input as NextInput } from "@nextui-org/react"
import { Control, useController } from "react-hook-form"

// Какие данные нужны нашему полю ввода.
type Input = {
  name: string
  placeholder?: string
  type?: string
  label: string
  control: Control<any>
  required?: string | boolean
  endContent?: JSX.Element
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// Это обёртка над NextUI Input, которая дружит с react-hook-form.
export const Input: React.FC<Input> = ({
  name,
  placeholder,
  type,
  label,
  control,
  required = "",
  endContent,
  onChange,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required },
  })
  return (
    <NextInput
      id={name}
      name={field.name}
      value={field.value}
      isInvalid={invalid}
      onChange={(e) => {
        field.onChange(e)
        onChange?.(e)
      }}
      onBlur={field.onBlur}
      errorMessage={errors[name]?.message as string | ""}
      placeholder={placeholder}
      type={type}
      label={label}
      endContent={endContent}
    />
  )
}
