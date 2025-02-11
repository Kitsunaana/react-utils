import { createContext, ReactNode, useContext, useState } from "react"

interface IModalContextProps {
  isOpen: boolean
  open: () => void
  close: () => void
}

interface IModalProviderProps {
  children: ReactNode
}

const baseModalProps = {
  isOpen: false,
  close: () => {},
  open: () => {},
}

export const createModal = () => {
  const modalContext = createContext<IModalContextProps>(baseModalProps)

  return {
    useModal: () => useContext(modalContext),
    ModalProvider: ({ children }: IModalProviderProps) => {
      const [isOpen, setIsOpen] = useState(false)

      const handleOpen = () => setIsOpen(true)
      const handleClose = () => setIsOpen(false)

      return (
        <modalContext.Provider 
          value={{
            isOpen,
            open: handleOpen,
            close: handleClose,
          }}
        >
          {children}
        </modalContext.Provider>
      )
    },
  }
}

