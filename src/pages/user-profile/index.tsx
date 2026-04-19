import { Card, Image, Spinner, useDisclosure } from "@nextui-org/react"
import { ErrorMessage } from "../../components/error-message"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import { useParams } from "react-router-dom"
import { selectCurrentUser } from "../../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi"
import { GoBack } from "../../components/go-back"
import { BASE_URL } from "../../constants"
import { Button } from "../../components/button"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfo } from "../../components/profile-info"
import { formatToClientDate } from "../../utils/formt-to-client-date"
import { CountInfo } from "../../components/count-info"
import { ProfileEdit } from "../../components/profile-edit"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const currentUserId = useSelector(selectCurrentUser)?.id
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserById] = useLazyGetUserByIdQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const { data, isLoading, isError, error } = useGetUserByIdQuery(id ?? "", {
    skip: !id,
  })

  const avatarSrc = data?.avatarUrl
    ? data.avatarUrl.startsWith("/")
      ? `${BASE_URL}${data.avatarUrl}`
      : `${BASE_URL}/avatars/${data.avatarUrl}`
    : ""

  if (!data) return null
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    )
  }
  if (isError) {
    const apiError = error as { status?: number }
    if (apiError?.status === 404) {
      return <h2>Пользователя не существует</h2>
    }
    return <ErrorMessage error="Не удалось загрузить пользователя" />
  }
  const handleFollowToggle = () => async () => {
    try {
      if (data.isFollowing) {
        await unfollowUser(id ?? "").unwrap()
      } else {
        await followUser(id ?? "").unwrap()
      }
      await triggerGetUserById(id ?? "").unwrap()
      await triggerCurrentQuery().unwrap()
    } catch (err) {
      console.error("Failed to toggle follow status:", err)
    }
  }
  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserById(id)
        await triggerCurrentQuery()
        onClose()
      }
    } catch (err) {
      console.error("Failed to update user data:", err)
    }
  }

  return (
    <>
      <GoBack />
      <div className="flex item-center gap-4">
        <Card className="flex flex-2 flex-col items-center text-center space-y-4 gap-4 p-5">
          <Image
            src={avatarSrc}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUserId !== data.id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollowToggle()}
                icon={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button icon={<CiEdit />} onClick={onOpen}>
                Редактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Город" info={data.location} />
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="О себе" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo title="Подписчики" count={data.followers?.length ?? 0} />
            <CountInfo title="Подписки" count={data.following?.length ?? 0} />
          </div>
        </Card>
      </div>
      <ProfileEdit isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  )
}
