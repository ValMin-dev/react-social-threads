import { Link } from "react-router-dom"
import { Button } from "../button"
type Props = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

export const NavButton: React.FC<Props> = ({ children, icon, href }) => {
  return (
    <Button className="flex text-xl   justify-start" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  )
}
