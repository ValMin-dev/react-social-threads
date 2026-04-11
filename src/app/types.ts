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

export type Follows = {
  id: string
  follower: User
  followerId: string
  following: User
  followingId: string
}
export type Like = {
  id: string
  user: User
  userId: string
  post: Post
  postId: string
}

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

export type Comment = {
  id: string
  content: string
  author: User
  userId: string
  post: Post
  postId: string
  createdAt: Date
}
