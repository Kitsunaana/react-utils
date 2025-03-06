import { UiModal } from "../../../shared/ui/modal"
import { ConfirmationModalParams } from "../model"

export const ConfirmationModal = ({ params }: {
  params: ConfirmationModalParams
}) => {
  return (
    <UiModal
      isOpen={params.isOpen}
      onClose={params.onClose}
      renderContent={(handleClose) => (
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl">{params.title}</h3>
          <h4 className="text-md max-w-100 mb-3">{params.description}</h4>

          <div className="flex gap-2">
            <button 
              onClick={() => handleClose(params.onConfirm)}
              className="bg-red-500 p-2 rounded-md text-white cursor-pointer"
            >
              {params.confirmText}
            </button>
            <button
              onClick={() => handleClose(params.onCancel)}
              className="bg-green-400 p-2 rounded-md text-white cursor-pointer"
            >
              {params.closeText}
            </button>
          </div>
        </div>
      )} 
    />
  )
}