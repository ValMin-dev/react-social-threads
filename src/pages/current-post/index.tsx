import { useParams } from "react-router-dom"

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  return (
    <div>
      <h1>Current Post</h1>
    </div>
  )
}
