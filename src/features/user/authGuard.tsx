import { Spinner } from "@nextui-org/react"
import { useCurrentQuery } from "../../app/services/userApi"

// Ждёт загрузку текущего пользователя, чтобы приложение не мигало.
export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    // Пока идёт проверка пользователя, показываем спиннер.
    return <Spinner />
  }

  return children
}
