import { ChangeEvent } from "react"
import { LoginModal } from "./features/auth/login/login-modal"
import { RegisterModal } from "./features/auth/register/register-modal"
import { loginModal, registerModal } from "./kernel/modals"
import { createModal } from "./shared/lib/modal-factory"
import { UiModal } from "./shared/ui/modal"
import { BaseModalLayout } from "./shared/ui/layouts/base-modal-layout"

// Step: 1
export const filesUploadModal = createModal("filesUpload")
  .withParams<File[]>()

const useFilesUploadModal = () => {
  const startFilesUpload = filesUploadModal.useModal()

  const handleFilesUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return
    
    // Step: 2
    startFilesUpload.open(Array.from(event.target.files))
  }

  return handleFilesUpload
}

// Step: 3
export const FilesUploadedModal = () => {
  const startFilesUpload = filesUploadModal.useModal()

  console.log(startFilesUpload.payload)

  return (
    <UiModal 
      isOpen={startFilesUpload.isOpen}
      onClose={startFilesUpload.close}
      renderContent={(handleClose) => (
        <BaseModalLayout
          caption="Загруженные изображения"
          onClose={handleClose}
          body={(
            <div>
              123
            </div>
          )}
        />
      )}
    />
  )
}

export const App = () => {
  const startLogin = loginModal.useModal()
  const startRegister = registerModal.useModal()

  const filesUpload = useFilesUploadModal()

  return (
    <div className="flex gap-2 p-2">
      <button 
        onClick={() => startLogin.open()}
        className="bg-teal-500 p-2 rounded-md text-white cursor-pointer"
      >
        login
      </button>
      <button
        className="bg-teal-500 p-2 rounded-md text-white cursor-pointer"  
        onClick={() => startRegister.open({ 
          name: "alex",
          password: "password123"
        })}
      >
        register
      </button>

      <input 
        type="file"
        multiple
        onChange={filesUpload}
      />

      <RegisterModal />
      <LoginModal />
      <FilesUploadedModal />
    </div>
  )
}