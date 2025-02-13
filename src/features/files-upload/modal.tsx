import { memo, useState } from "react"
import { BaseModalLayout } from "../../shared/ui/layouts/base-modal-layout"
import { UiModal } from "../../shared/ui/modal"
import { filesUploadModal } from "./model"

const imageToBase64 = (image: File) => (
  new Promise<string>((resolve) => {
    const reader = new FileReader()

    reader.readAsDataURL(image)
    reader.onload = () => resolve(reader.result as string);
  })
)

const convertImagesToB64 = async (images: File[]) => {
  return await Promise.all<Promise<string>>(
    images.map(image => (
      imageToBase64(image)
    ))
  )
}

const ModalBody = memo(({
  handleClose,
}: {
  handleClose: () => void
}) => {
  const startFilesUpload = filesUploadModal.useModal()
  const [convertedImages, setConvertedImages] = useState<string[]>([])

  convertImagesToB64(startFilesUpload.payload!)
    .then(setConvertedImages)

  return (
    <BaseModalLayout
      caption="Загруженные изображения"
      onClose={handleClose}
      body={(
        <div>
          {convertedImages.map((imageB64, index) => (
            <img
              key={index}
              src={imageB64}
              className="max-w-[200px]"
              alt=""
            />
          ))}
        </div>
      )}
    />
  )
})

export const FilesUploadedModal = () => {
  const startFilesUpload = filesUploadModal.useModal()

  filesUploadModal.useOnAfterOpen(() => console.log("После открытия в компонете"))

  filesUploadModal.useOnAfterClose(() => {})

  return (
    <UiModal
      isOpen={startFilesUpload.isOpen}
      onClose={startFilesUpload.close}
      renderContent={(handleClose) => <ModalBody handleClose={handleClose} />}
    />
  )
}