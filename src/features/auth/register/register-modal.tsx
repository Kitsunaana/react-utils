import { loginModal, registerModal } from "../../../kernel/modals"
import { BaseModalLayout } from "../../../shared/ui/layouts/base-modal-layout"
import { Modal } from "../../../shared/ui/modal"

export const RegisterModal = () => {
  const login = loginModal.useModal()
  const register = registerModal.useModal()

  const handleStartLogin = () => {
    register.close()
    login.open()
  }

  return (
    <Modal
      disableBackdropClose
      isOpen={register.isOpen}
      onClose={register.close}
      className="max-w-[480px] w-full"
      renderContent={(handleClose) => (
        <BaseModalLayout 
          caption="Регистрация"
          onClose={handleClose}
          footer={(
            <span className="text-sm text-[#656F77]">
              Уже есть аккаунт?{" "} 
              <span
                onClick={handleStartLogin} 
                className="text-black underline cursor-pointer"
              >
                Войти
              </span>
            </span>
          )}
        />
      )}
    />
  )
}