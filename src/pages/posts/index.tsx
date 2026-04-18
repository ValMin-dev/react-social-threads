import { useGetAllPostsQuery } from "../../app/services/postsApi"
import { Card } from "../../components/card"
import { CreatePost } from "../../components/create-post"

export const Posts = () => {
  const { data } = useGetAllPostsQuery()
  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data?.map(
            ({
              content,
              author,
              id,
              authorId,
              likes,
              comments,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                content={content}
                avatarUrl={author.avatarUrl ?? ""}
                name={author.name ?? ""}
                id={id}
                authorId={authorId}
                likesCount={likes.length}
                commentsCount={comments.length}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
              />
            ),
          )
        : null}
    </>
  )
}
