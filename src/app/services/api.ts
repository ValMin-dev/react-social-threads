import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constants"
import { RootState } from "../store"

// Базовая конфигурация RTK Query для всех API-запросов приложения.
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  // Добавляет токен авторизации в заголовки, если пользователь уже вошёл в систему.
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem("token")
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})

// Повторяет неудачный запрос один раз перед окончательной ошибкой.
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

// Общий API-клиент, который расширяется endpoint-ами в отдельных модулях.
export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  // Перезапрашивает данные при повторном монтировании или изменении аргументов запроса.
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
