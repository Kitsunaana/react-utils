import { ChangeEvent } from "react";
import { createModal } from "../../shared/lib/modal-factory";

export const filesUploadModal = createModal("filesUpload")
  .withParams<File[]>()

filesUploadModal.onAfterClose(() => console.log("Сообщение вне компоненты после закрытия окна"))
filesUploadModal.onAfterClose(() => console.log("Действий может быть сколь угодно много"))

filesUploadModal.onAfterOpen(() => console.log("Сообщение вне компоненты после открытия"))

export const useFilesUploadLogic = () => {
  const startFilesUpload = filesUploadModal.useModal()

  return (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return
    
    startFilesUpload
      .open(Array.from(event.target.files))
  }
}