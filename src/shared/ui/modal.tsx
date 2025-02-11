import { clsx } from "clsx"
import { ReactNode } from "react"

import { useCallback, useEffect, useRef, useState } from "react"

const ANIMATION_DELAY = 300

export const Modal = ({
  isOpen,
  onClose,
  className,
  renderContent,
  disableBackdropClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  className?: string
  disableBackdropClose?: boolean
  renderContent: (onClose: () => void) => ReactNode;
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleClose = useCallback(() => {
    setIsClosing(true)

    timerRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, ANIMATION_DELAY)
  }, [onClose])

  useEffect(() => () => clearTimeout(timerRef.current), [isOpen])

  const handleBackdropClose = () => {
    if (!disableBackdropClose) handleClose()
  }

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div 
      onClick={handleBackdropClose}
      className={clsx(`opacity-0 invisible duration-[${ANIMATION_DELAY}ms] absolute z-10 top-0 left-0 bg-black/40 h-[100vh] w-[100vw] flex items-center justify-center`, {
        "opacity-100 visible": isOpen && !isClosing,
      })}
    >
      <div 
        onClick={handleContentClick}
        className={clsx(`duration-[${ANIMATION_DELAY}ms] bg-white inline-flex p-6 rounded-lg scale-50`, {
          "scale-100": isOpen && !isClosing,
        }, className)}
      >
        {renderContent(handleClose)}
      </div>
    </div>
  )
}