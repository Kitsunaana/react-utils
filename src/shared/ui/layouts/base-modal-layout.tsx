import { ReactNode } from "react"
import { CloseIcon } from "../close-icon"

export const BaseModalLayout = ({
  caption,
  onClose,
  header,
  body,
  footer,
}: {
  caption: string
  onClose: () => void
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2 justify-between w-full">
        <h4 className="font-medium text-lg">{caption}</h4>
        <button 
          onClick={onClose}
          className="cursor-pointer"
        >
          <CloseIcon />
        </button>
        {header}
      </div>

      <div>{body}</div>

      <div className="flex justify-center">
        {footer}
      </div>
    </div>
  )
}