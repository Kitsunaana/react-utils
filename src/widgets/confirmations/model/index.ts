import { ReactNode } from "react"

export type ConfirmationModalParams = {
  isOpen: boolean
  title: string
  description: string | ReactNode
  closeText: string
  confirmText: string
  onClose: () => void
  onCancel: () => void
  onConfirm: () => void
}