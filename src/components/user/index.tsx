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
  return (
    <NextUiUser
      name={name}
      avatarProps={{
        src: `${BASE_URL}/avatars/${avatarUrl}`,
      }}
      description={description}
      className={className}
    ></NextUiUser>
  )
}
