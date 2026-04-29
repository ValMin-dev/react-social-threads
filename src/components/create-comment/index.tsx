import { useParams } from "react-router-dom"
import { useLazyGetPostByIdQuery } from "../../app/services/postsApi"
import { Controller, useForm } from "react-hook-form"
import { Button } from "../button"
import { Textarea } from "@nextui-org/react"
import { ErrorMessage } from "../error-message"
import { IoMdCreate } from "react-icons/io"
import { useCreateCommentMutation } from "../../app/services/commentsApi"

// Форма для добавления комментария к посту.
export const CreateComment = () => {
  const { id } = useParams<{ id: string }>()
  const [getPostById] = useLazyGetPostByIdQuery()
  const [createComment] = useCreateCommentMutation()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()
  const error = errors?.comment?.message as string

  // Создаёт комментарий и потом заново загружает пост.
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap()
        setValue("comment", "")
        await getPostById(id).unwrap()
      }
    } catch (err) {
      console.error("Failed to create comment:", err)
    }
  })

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="comment"
        defaultValue=""
        control={control}
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Напишите комментарий..."
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="primary"
        className="flex-end"
        icon={<IoMdCreate />}
        type="submit"
      >
        Ответить
      </Button>
    </form>
  )
}
