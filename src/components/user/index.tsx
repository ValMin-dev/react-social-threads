import { User as NextUiUser } from "@nextui-org/react"
import { BASE_URL } from "../../constants"

type Props = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

export const User: React.FC<Props> = ({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}) => {
  const avatarSrc = avatarUrl
    ? avatarUrl.startsWith("/")
      ? `${BASE_URL}${avatarUrl}`
      : `${BASE_URL}/avatars/${avatarUrl}`
    : ""

  return (
    <NextUiUser
      name={name}
      avatarProps={{
        src: avatarSrc,
      }}
      description={description}
      className={className}
    ></NextUiUser>
  )
}
