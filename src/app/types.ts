// Описание пользователя и связанных с ним данных.
export type User = {
  id: string
  email: string
  password: string
  name?: string
  avatarUrl?: string
  dateOfBirth?: string
  createdAt: Date
  updatedAt: Date
  bio?: string
  location?: string
  posts: Post[]
  followers: Follows[]
  following: Follows[]
  likes: Like[]
  comments: Comment[]
  isFollowing?: boolean
}

// Подписка одного пользователя на другого.
export type Follows = {
  id: string
  follower: User
  followerId: string
  following: User
  followingId: string
}
// Лайк, который пользователь поставил посту.
export type Like = {
  id: string
  user: User
  userId: string
  post: Post
  postId: string
}

// Пост пользователя с лайками и комментариями.
export type Post = {
  id: string
  content: string
  author: User
  authorId: string
  createdAt: Date
  updatedAt: Date
  likes: Like[]
  comments: Comment[]
  likedByUser?: boolean
}

// Комментарий к посту.
export type Comment = {
  id: string
  content: string
  author: User
  userId: string
  post: Post
  postId: string
  createdAt: Date
}
