import { LoginModal } from "./features/auth/login/login-modal"
import { RegisterModal } from "./features/auth/register/register-modal"
import { loginModal, registerModal } from "./kernel/modals"

export const App = () => {
  const startLogin = loginModal.useModal()
  const startRegister = registerModal.useModal()

  return (
    <div className="flex gap-2 p-2">
      <button 
        onClick={startLogin.open}
        className="bg-teal-500 p-2 rounded-md text-white cursor-pointer"
      >
          login
        </button>
      <button
        onClick={startRegister.open}
        className="bg-teal-500 p-2 rounded-md text-white cursor-pointer"  
      >
        register
      </button>

      <RegisterModal />
      <LoginModal />
    </div>
  )
}