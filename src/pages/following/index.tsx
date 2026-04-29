import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/user/userSlice"
import { Link } from "react-router-dom"
import { Card, CardBody } from "@nextui-org/react"
import { User } from "../../components/user"

// Страница со списком людей, на которых подписан текущий пользователь.
export const Following = () => {
  const currentUser = useSelector(selectCurrentUser)

  if (!currentUser) {
    return <p>Пользователь не найден</p>
  }

  return currentUser.following?.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map((following) => (
        <Link
          to={`/users/${following.following.id}`}
          key={following.following.id}
          className="flex items-center gap-4 p-4 border rounded"
        >
          <Card>
            <CardBody className="block">
              <User
                name={following.following.name ?? ""}
                avatarUrl={following.following.avatarUrl ?? ""}
                description={following.following.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <p>У вас нет подписок</p>
  )
}
