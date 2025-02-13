import { LoginModal } from "./features/auth/login/login-modal"
import { RegisterModal } from "./features/auth/register/register-modal"
import { FilesUploadedModal } from "./features/files-upload"
import { useFilesUploadLogic } from "./features/files-upload/model"
import { loginModal, registerModal } from "./kernel/modals"

export const App = () => {
  const startLogin = loginModal.useModal()
  const startRegister = registerModal.useModal()

  const filesUpload = useFilesUploadLogic()

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