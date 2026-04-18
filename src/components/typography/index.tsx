type Props = {
  children: string
  size?: string
}

export const Typography: React.FC<Props> = ({ children, size = "xl" }) => {
  return <p className={`text-${size}`}>{children}</p>
}
