import { useNavigate } from "react-router-dom"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"

// Простая кнопка "назад".
export const GoBack = () => {
  const navigate = useNavigate()
  // Возвращает пользователя на предыдущую страницу.
  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <div
      className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer"
      onClick={handleGoBack}
    >
      <FaRegArrowAltCircleLeft />
      Назад
    </div>
  )
}
