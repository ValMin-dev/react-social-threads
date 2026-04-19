import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/user/userSlice"
import { Link } from "react-router-dom"
import { Card, CardBody } from "@nextui-org/react"
import { User } from "../../components/user"

export const Followers = () => {
  const currentUser = useSelector(selectCurrentUser)

  if (!currentUser) {
    return <p>Пользователь не найден</p>
  }

  return currentUser.followers?.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map((follower) => (
        <Link
          to={`/users/${follower.follower.id}`}
          key={follower.follower.id}
          className="flex items-center gap-4 p-4 border rounded"
        >
          <Card>
            <CardBody className="block">
              <User
                name={follower.follower.name ?? ""}
                avatarUrl={follower.follower.avatarUrl ?? ""}
                description={follower.follower.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <p>У вас нет подписчиков</p>
  )
}
