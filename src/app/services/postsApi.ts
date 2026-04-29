import { Post } from "../types"
import { api } from "./api"

// Это пост с дополнительным флагом от бэкенда: лайкнул ли его текущий пользователь.
type PostWithBackendLikeField = Post & {
  likedByCurrentUser?: boolean
}

// Ответ сервера после создания поста.
type CreatePostResponse = {
  message: string
  post: Post
}

// Ответ сервера со списком постов.
type GetAllPostsResponse = {
  postsWithLikeInfo: PostWithBackendLikeField[]
}

// Запросы для создания, чтения, обновления и удаления постов.
export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Создаёт новый пост.
    createPost: builder.mutation<CreatePostResponse, { content: string }>({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
    }),

    // Загружает все посты.
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      // Переименовывает поле likedByCurrentUser в более удобное likedByUser.
      transformResponse: (response: GetAllPostsResponse) =>
        response.postsWithLikeInfo.map((post) => ({
          ...post,
          likedByUser: post.likedByCurrentUser,
        })),
    }),

    // Загружает один пост по id.
    getPostById: builder.query<Post, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      // Тоже приводит имя поля лайка к виду, который использует фронт.
      transformResponse: (response: PostWithBackendLikeField) => ({
        ...response,
        likedByUser: response.likedByCurrentUser,
      }),
    }),
    // Обновляет текст поста.
    updatePostById: builder.mutation<Post, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: { content },
      }),
    }),
    // Удаляет пост по id.
    deletePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

// Готовые хуки для компонентов, которые работают с постами.
export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLazyGetPostByIdQuery,
  useUpdatePostByIdMutation,
} = postApi
