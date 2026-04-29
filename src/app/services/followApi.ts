import { api } from "./api"

// Запросы для подписки и отписки от пользователей.
export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Подписывает текущего пользователя на другого пользователя.
    followUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: "/follows",
        method: "POST",
        body: { followingId: userId },
      }),
    }),
    // Отписывает текущего пользователя от другого пользователя.
    unfollowUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `/follows/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
})

// Хуки для кнопок подписки и отписки.
export const { useFollowUserMutation, useUnfollowUserMutation } = followApi
