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

  return (
    <Card className="py-4 w-[400px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          src={`${BASE_URL}/avatars/${avatarUrl}`}
          width={300}
          alt="Avatar"
          className="rounded-xl object-cover w-24 h-24 mb-4"
        />
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
