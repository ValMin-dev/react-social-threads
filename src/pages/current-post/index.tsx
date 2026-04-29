import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import { Card } from "../../components/card"
import { Spinner } from "@nextui-org/react"
import { ErrorMessage } from "../../components/error-message"
import { GoBack } from "../../components/go-back"
import { CreateComment } from "../../components/create-comment"

// Страница одного поста с комментариями.
export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data, isLoading, isError, error } = useGetPostByIdQuery(
    params.id ?? "",
    {
      skip: !params.id,
    },
  )

  if (isLoading) {
    // Пока пост загружается, показываем спиннер.
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    // Показываем понятное сообщение, если пост не найден или сервер ответил ошибкой.
    const apiError = error as { status?: number }
    if (apiError?.status === 404) {
      return <h2>Поста не существует</h2>
    }
    return <ErrorMessage error="Не удалось загрузить пост" />
  }

  if (!data) {
    return <h2>Поста не существует</h2>
  }
  const {
    content,
    id,
    authorId,
    likes,
    author,
    comments,
    likedByUser,
    createdAt,
  } = data

  return (
    <>
      <GoBack />
      <Card
        id={id}
        cardFor="currentPost"
        content={content}
        name={author.name ?? ""}
        avatarUrl={author.avatarUrl ?? ""}
        authorId={authorId}
        likesCount={likes.length}
        commentsCount={comments.length}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {/* Здесь рендерятся все комментарии к посту. */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card
              key={comment.id}
              id={comment.postId}
              commentId={comment.id}
              cardFor="comment"
              content={comment.content}
              name={comment.author?.name ?? ""}
              authorId={comment.userId}
              avatarUrl={comment.author?.avatarUrl ?? ""}
              commentsCount={0}
              createdAt={comment.createdAt}
            />
          ))
        ) : (
          <p>Комментариев нет</p>
        )}
      </div>
    </>
  )
}
