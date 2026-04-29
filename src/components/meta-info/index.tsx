import { IconType } from "react-icons"

// Маленький блок: иконка плюс число рядом.
type Props = {
  count: number
  Icon: IconType
}
export const MetaInfo: React.FC<Props> = ({ count, Icon }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {count > 0 && (
        <span className="font-semibold text-default-400 text-l">{count}</span>
      )}
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
    </div>
  )
}
