import { Post } from "../types"
import { api } from "./api"

type PostWithBackendLikeField = Post & {
  likedByCurrentUser?: boolean
}

type CreatePostResponse = {
  message: string
  post: Post
}

type GetAllPostsResponse = {
  postsWithLikeInfo: PostWithBackendLikeField[]
}

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<CreatePostResponse, { content: string }>({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
    }),

    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      transformResponse: (response: GetAllPostsResponse) =>
        response.postsWithLikeInfo.map((post) => ({
          ...post,
          likedByUser: post.likedByCurrentUser,
        })),
    }),

    getPostById: builder.query<Post, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      transformResponse: (response: PostWithBackendLikeField) => ({
        ...response,
        likedByUser: response.likedByCurrentUser,
      }),
    }),
    updatePostById: builder.mutation<Post, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: { content },
      }),
    }),
    deletePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLazyGetPostByIdQuery,
  useUpdatePostByIdMutation,
} = postApi
