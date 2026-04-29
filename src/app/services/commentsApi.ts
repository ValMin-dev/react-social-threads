import { api } from "./api"

// RTK Query endpoints для создания, обновления и удаления комментариев.
export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Создаёт новый комментарий.
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (newComment) => ({
        url: "/comments",
        method: "POST",
        body: newComment,
      }),
    }),
    // Обновляет текст существующего комментария по id.
    updateComment: builder.mutation<Comment, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: { content },
      }),
    }),
    // Удаляет комментарий по id.
    deleteComment: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi
