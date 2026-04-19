import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUICard,
  Spinner,
} from "@nextui-org/react"
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../app/services/likesApi"
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../app/services/postsApi"
import { useDeleteCommentMutation } from "../../app/services/commentsApi"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/user/userSlice"
import { User } from "../user"
import { formatToClientDate } from "./../../utils/formt-to-client-date"
import { RiDeleteBinLine } from "react-icons/ri"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { FcDislike } from "react-icons/fc"
import { Typography } from "../typography"
import { MetaInfo } from "../meta-info"
import { FaRegComment } from "react-icons/fa"
import { ErrorMessage } from "../error-message"
type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt: Date
  id?: string
  cardFor?: "post" | "comment" | "currentPost"
  likedByUser?: boolean
}

export const Card: React.FC<Props> = ({
  id = "",
  name = "",
  authorId = "",
  avatarUrl = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [triggerAllPost] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()

  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const refetchPosts = async () => {}

  const handleClick = async () => {
    try {
      likedByUser ? await unlikePost(id).unwrap() : await likePost(id).unwrap()
      if (cardFor === "post") {
        triggerAllPost()
      } else if (cardFor === "comment") {
        triggerGetPostById(id)
      } else if (cardFor === "currentPost") {
        triggerGetPostById(id)
      }
    } catch (error) {
      setError("An error occurred while liking/unliking the post.")
    }
  }

  const handleDelete = async () => {
    try {
      if (cardFor === "post") {
        await deletePost(id).unwrap()
        triggerAllPost()
      } else if (cardFor === "comment") {
        await deleteComment(commentId).unwrap()
        triggerGetPostById(id)
      } else if (cardFor === "currentPost") {
        await deletePost(id).unwrap()
        navigate("/posts")
      }
    } catch (error) {
      setError("An error occurred while deleting.")
    }
  }

  return (
    <NextUICard className="mb-5">
      <CardHeader className="w-full items-center justify-between bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            avatarUrl={avatarUrl}
            description={formatToClientDate(createdAt as string)}
            className="text-small font-semibold leading-none text-default-600"
          ></User>
        </Link>
        {authorId === currentUser?.id && (
          <div className="ml-auto cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner size="sm" />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography size="base">{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div className="cursor-pointer" onClick={handleClick}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              ></MetaInfo>
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment}></MetaInfo>
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUICard>
  )
}
