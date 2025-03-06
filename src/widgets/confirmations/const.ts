import { ConfirmationModalParams } from "./model"

export const defaultConfirmationParams: ConfirmationModalParams = {
  isOpen: false,
  title: "Confirmation окно",
  description: "Описание для действия, вы уверены, что хотите и бла-бла-бла...",
  closeText: "Не, не хочу",
  confirmText: "Да, конечно",
  onClose: () => { },
  onCancel: () => { },
  onConfirm: () => { },
}