import { api } from "./api"

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (newComment) => ({
        url: "/comments",
        method: "POST",
        body: newComment,
      }),
    }),
    updateComment: builder.mutation<Comment, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: { content },
      }),
    }),
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
