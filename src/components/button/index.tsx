import { Button as NextBtn } from "@nextui-org/react"

// Какие данные умеет принимать наша кнопка.
type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  isLoading?: boolean
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "default"
    | "danger"
    | undefined
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined
  onClick?: () => void
}

// Это наша общая кнопка-обёртка над NextUI Button.
export const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type = "button",
  fullWidth,
  color,
  variant = "light",
  isLoading,
  onClick,
}) => {
  return (
    <NextBtn
      className={className}
      startContent={icon}
      variant={variant}
      isLoading={isLoading}
      size="lg"
      type={type}
      fullWidth={fullWidth}
      color={color}
      onClick={onClick}
    >
      {children}
    </NextBtn>
  )
}
