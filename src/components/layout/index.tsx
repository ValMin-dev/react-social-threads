import { Outlet, useNavigate } from "react-router-dom"
import { Container } from "../container"
import { Header } from "../header"
import { NavBar } from "../navbar"
import { useSelector } from "react-redux"
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../features/user/userSlice"
import { useEffect } from "react"
import { Profile } from "../profile"

// Главный layout для приватной части приложения.
export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()

  // Если пользователь не вошёл, отправляем его на страницу авторизации.
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [isAuthenticated, navigate])
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{user && <Profile />}</div>
        </div>
      </Container>
    </>
  )
}
