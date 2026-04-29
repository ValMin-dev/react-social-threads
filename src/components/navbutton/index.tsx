import { Link } from "react-router-dom"
import { Button } from "../button"

// Что нужно для одной кнопки в боковом меню.
type Props = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

// Кнопка-ссылка для навигации по приложению.
export const NavButton: React.FC<Props> = ({ children, icon, href }) => {
  return (
    <Button className="flex text-xl   justify-start" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  )
}
