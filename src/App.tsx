import { LoginModal } from "./features/auth/login/login-modal"
import { RegisterModal } from "./features/auth/register/register-modal"
import { FilesUploadedModal } from "./features/files-upload"
import { useFilesUploadLogic } from "./features/files-upload/model"
import { loginModal, registerModal } from "./kernel/modals"
import { useGetConfirmation } from "./shared/lib/confirmation"

const useGetRemoveUser = () => {
  const getConfirmatoin = useGetConfirmation()

  return async () => {
    const confirmation = await getConfirmatoin({
      title: "Измененный title"
    })

    if (confirmation) return console.log("Функция для удаления пользователя")

    return console.log("Вы решили его не удалять")
  }
}

export const App = () => {
  const startLogin = loginModal.useModal()
  const startRegister = registerModal.useModal()

  const filesUpload = useFilesUploadLogic()

  const handleRemoveUser = useGetRemoveUser()

  return (
    <div className="flex gap-2 p-2">
      <button
        onClick={handleRemoveUser}
        className="bg-red-500 p-2 rounded-md text-white cursor-pointer"
      >
        Удалить Kitsunaana
      </button>

      <button 
        onClick={() => startLogin.open({})}
        className="bg-teal-500 p-2 rounded-md text-white cursor-pointer"
      >
        login
      </button>
      <button
        className="bg-teal-500 p-2 rounded-md text-white cursor-pointer"  
        onClick={() => startRegister.open({ 
          name: "alex",
          password: "password123",
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