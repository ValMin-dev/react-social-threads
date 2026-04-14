import { Input as NextInput } from "@nextui-org/react"
import { Control, useController } from "react-hook-form"

type Input = {
  name: string
  placeholder?: string
  type?: string
  label: string
  control: Control<any>
  required?: string | boolean
  endContent?: JSX.Element
}

export const Input: React.FC<Input> = ({
  name,
  placeholder,
  type,
  label,
  control,
  required = "",
  endContent,
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
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={errors[name]?.message as string | ""}
      placeholder={placeholder}
      type={type}
      label={label}
      endContent={endContent}
    />
  )
}
