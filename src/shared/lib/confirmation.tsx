import { createContext, ReactNode, useContext } from "react"

export type ConfirmationParams = {
  title?: string
  description?: string | ReactNode
  closeText?: string
  confirmText?: string
}

export type ConfirmationContextProps = {
  getConfirmation: (params: ConfirmationParams) => Promise<boolean>
  closeConfirmation: () => void
}

export const confirmationContext = createContext<ConfirmationContextProps | null>(null)

export const useGetConfirmation = () => {
  const context = useContext(confirmationContext)
  if (context === null) throw new Error("Confiramtion error")

  return context.getConfirmation
}