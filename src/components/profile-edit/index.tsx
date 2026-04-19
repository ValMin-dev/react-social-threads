import { useContext, useState } from "react"
import { User } from "../../app/types"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { ThemeContext } from "../theme-provider"
import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  ModalFooter,
} from "@nextui-org/react"
import { Input } from "../input"
import { MdOutlineEmail } from "react-icons/md"
import { ErrorMessage } from "../error-message"
import { Button } from "../button"
import { hasErrorField } from "../../utils/has-error-field"

type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

export const ProfileEdit: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [error, setError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      bio: user?.bio || "",
      dateOfBirth: user?.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : undefined,
      location: user?.location || "",
    },
  })
  if (!user) {
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setSelectedFile(e.target.files[0])
    }
  }

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData()

        data.name && formData.append("name", data.name)
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email)
        data.bio && formData.append("bio", data.bio)
        data.location && formData.append("location", data.location)
        if (selectedFile) {
          formData.append("avatar", selectedFile)
        }
        if (data.dateOfBirth) {
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          )
        }
        await updateUser({ id, userData: formData }).unwrap()

        onClose()
      } catch (error) {
        if (hasErrorField(error)) {
          setError(error.data.error)
        }
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Редактировать профиль
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type="email"
                  endContent={<MdOutlineEmail />}
                  control={control}
                  name="email"
                  label="Email"
                />
                <Input type="text" control={control} name="name" label="Имя" />

                <Input
                  type="text"
                  control={control}
                  name="location"
                  label="Город"
                />
                <Input
                  type="date"
                  control={control}
                  name="dateOfBirth"
                  label="Дата рождения"
                  placeholder="Дата рождения"
                />
                <Input
                  type="file"
                  control={control}
                  name="avatarUrl"
                  label="Аватар"
                  placeholder="Выберите аватар"
                  onChange={handleFileChange}
                />
                <Controller
                  control={control}
                  name="bio"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      type="text"
                      label="О себе"
                      placeholder="Расскажите о себе"
                      minRows={4}
                    />
                  )}
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Сохранить
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
