import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/user/userSlice"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { BASE_URL } from "../../constants"
import { Link } from "react-router-dom"
import { MdAlternateEmail } from "react-icons/md"

export const Profile = () => {
  const currentUser = useSelector(selectCurrentUser)

  if (!currentUser) {
    return null
  }
  const { name, email, avatarUrl, id } = currentUser
  const avatarSrc = avatarUrl
    ? avatarUrl.startsWith("/")
      ? `${BASE_URL}${avatarUrl}`
      : `${BASE_URL}/avatars/${avatarUrl}`
    : ""

  return (
    <Card className="py-4 w-[300px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        {avatarUrl ? (
          <Image
            src={avatarSrc}
            width={300}
            alt="Avatar"
            className="rounded-xl object-cover w-24 h-24 mb-4"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-xl mb-4 flex items-center justify-center">
            <span className="text-gray-500">No Avatar</span>
          </div>
        )}
      </CardHeader>
      <CardBody>
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail />
          {email}
        </p>
      </CardBody>
    </Card>
  )
}
