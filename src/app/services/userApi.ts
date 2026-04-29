import { User } from "../types"
import { api } from "./api"

// Запросы, которые отвечают за пользователя, вход и регистрацию.
export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Вход пользователя и получение токена.
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    // Регистрация нового пользователя.
    register: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Получение данных текущего пользователя по токену.
    current: builder.query<{ user: User }, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),

    // Получение профиля пользователя по его id.
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      // Подмешивает флаг подписки в объект пользователя.
      transformResponse: (response: { user: User; isFollowing: boolean }) => ({
        ...response.user,
        isFollowing: response.isFollowing,
      }),
    }),
    // Обновление профиля пользователя.
    updateUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
})

// Готовые хуки для работы с запросами пользователя в React-компонентах.
export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} = userApi

// Экспорт самих endpoints, если нужно обращаться к ним вне компонентов.
export const {
  endpoints: { login, register, current, getUserById, updateUser },
} = userApi
