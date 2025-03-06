import { ReactNode, useMemo, useState } from "react";
import { ConfirmationModalParams } from "../model";
import { ConfirmationParams, confirmationContext } from "../../../shared/lib/confirmation";
import { defaultConfirmationParams } from "../const";
import { ConfirmationModal } from "./confirmation-modal"

export const ConfirmationsProvider = ({ children }: { children: ReactNode }) => {
  const [modalParams, setModalParams] = useState<ConfirmationModalParams>(defaultConfirmationParams)

  const closeConfirmation = () => modalParams?.onClose()

  const getConfirmation = (params: ConfirmationParams) => (
    new Promise<boolean>((resolve) => {
      setModalParams({
        ...defaultConfirmationParams,
        ...params,
        isOpen: true,
        onClose: () => setModalParams(defaultConfirmationParams),
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      })
    })
  )

  const confirmationContextValue = useMemo(() => ({
    getConfirmation,
    closeConfirmation,
  }), [])

  return (
    <confirmationContext.Provider value={confirmationContextValue}>
      {children}

      <ConfirmationModal params={modalParams} />
    </confirmationContext.Provider>
  )
}