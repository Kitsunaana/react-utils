import { ButtonHTMLAttributes } from "react"

export const UiButton = ({ caption, ...other }: ButtonHTMLAttributes<HTMLButtonElement> & {
  caption: string
}) => {
  return (
    <button
      className="disabled:bg-teal-500/50 bg-teal-500 p-2 rounded-md text-white cursor-pointer"  
      {...other}
    >
      {caption}
    </button>
  )
}