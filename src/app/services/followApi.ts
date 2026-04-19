import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: "/follows",
        method: "POST",
        body: { followingId: userId },
      }),
    }),
    unfollowUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `/follows/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followApi
