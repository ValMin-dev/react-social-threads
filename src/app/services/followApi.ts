import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `/follow/${userId}`,
        method: "POST",
      }),
    }),
    unfollowUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `/follow/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followApi
