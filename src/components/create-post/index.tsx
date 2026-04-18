import { Textarea } from "@nextui-org/react"
import { IoMdCreate } from "react-icons/io"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/postsApi"
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "../error-message"
import { Button } from "../button"
export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerAllPost] = useLazyGetAllPostsQuery()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()
  const error = errors?.post?.message as string
  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPost({ content: data.post }).unwrap()
      setValue("post", "")
      triggerAllPost()
    } catch (err) {
      console.error("Failed to create post:", err)
    }
  })

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="post"
        defaultValue=""
        rules={{
          required: "Обязательное поле",
        }}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="О чем вы думаете?"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="success"
        className="flex-end"
        icon={<IoMdCreate />}
        type="submit"
      >
        Добавить пост
      </Button>
    </form>
  )
}
