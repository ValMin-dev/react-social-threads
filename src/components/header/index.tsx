import { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { LuSunMedium } from "react-icons/lu"
import { FaRegMoon } from "react-icons/fa"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "../button"
import { CiLogout } from "react-icons/ci"
export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Social Threads</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? <LuSunMedium /> : <FaRegMoon />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogOut}
            >
              <CiLogout></CiLogout>
              <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
