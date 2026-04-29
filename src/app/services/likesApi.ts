import { api } from "./api"

// Запросы для лайка и снятия лайка с поста.
export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Ставит лайк посту по его id.
    likePost: builder.mutation<{ message: string }, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: "POST",
      }),
    }),
    // Убирает лайк с поста по его id.
    unlikePost: builder.mutation<{ message: string }, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
})

// Хуки для работы с лайками в компонентах.
export const { useLikePostMutation, useUnlikePostMutation } = likeApi
