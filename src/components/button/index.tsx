import { Button as NextBtn } from "@nextui-org/react"

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "default"
    | "danger"
    | undefined
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type = "button",
  fullWidth,
  color,
}) => {
  return (
    <NextBtn
      className={className}
      startContent={icon}
      variant="light"
      size="lg"
      type={type}
      fullWidth={fullWidth}
      color={color}
    >
      {children}
    </NextBtn>
  )
}
