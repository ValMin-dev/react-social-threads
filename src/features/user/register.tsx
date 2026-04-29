import { set, useForm } from "react-hook-form"
import { Input } from "../../components/input"
import { Button, Link } from "@nextui-org/react"
import {
  useLazyCurrentQuery,
  useRegisterMutation,
} from "../../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/error-message"

// Данные, которые приходят от родительской вкладки auth.
type Props = {
  setSelected: (value: string) => void
}
// Поля формы регистрации.
type Register = {
  email: string
  password: string
  name: string
}

// Форма регистрации нового пользователя.
export const Register: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  // Отправляет данные регистрации и после успеха переключает вкладку на логин.
  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    // Простая форма регистрации с именем, почтой и паролем.
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        control={control}
        name="name"
        label="Имя"
        required="Введите имя"
        type="text"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        required="Введите email"
        type="email"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        required="Введите пароль"
        type="password"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Уже есть акканут?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
          color="primary"
        >
          Войти
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}
