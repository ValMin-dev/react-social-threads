import { api } from "./api"

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<{ message: string }, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: "POST",
      }),
    }),
    unlikePost: builder.mutation<{ message: string }, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useLikePostMutation, useUnlikePostMutation } = likeApi
