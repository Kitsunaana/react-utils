import { clsx } from "clsx"
import { ReactNode } from "react"

import { useCallback, useEffect, useRef, useState } from "react"

export const UiModal = ({
  isOpen,
  onClose,
  className,
  hideOpacity,
  renderContent,
  disableBackdropClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  className?: string
  hideOpacity?: boolean;
  disableBackdropClose?: boolean
  renderContent: (onClose: () => void) => ReactNode;
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const [isRender, setIsRender] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleClose = useCallback(() => {
    setIsClosing(true)

    timerRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }, [onClose])

  useEffect(() => () => clearTimeout(timerRef.current), [isOpen])

  useEffect(() => {
    setTimeout(() => {
      setIsRender(isOpen)
    })
  }, [isOpen])

  const handleBackdropClose = () => {
    if (!disableBackdropClose) handleClose()
  }

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  if (!isOpen) return null

  return (
    <div 
      onClick={handleBackdropClose}
      className={clsx(`duration-300 absolute z-10 top-0 left-0 bg-black/40 h-[100vh] w-[100vw] flex items-center justify-center`, {
        "opacity-0 invisible": !hideOpacity,
        "opacity-100 visible": isRender && !isClosing,
      })}
    >
      <div 
        onClick={handleContentClick}
        className={clsx(`duration-300 bg-white inline-flex p-6 rounded-lg scale-50`, {
          "scale-100": isRender && !isClosing,
        }, className)}
      >
        {renderContent(handleClose)}
      </div>
    </div>
  )
}