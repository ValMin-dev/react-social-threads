type Props = {
  title: string
  count: number
}

export const CountInfo: React.FC<Props> = ({ title, count }) => {
  return (
    <div className="flex flex-col items-center space-x-2 p-4">
      <span className="text-gray-500 text-4xl font-semibold">{count}</span>
      <span>{title}</span>
    </div>
  )
}
