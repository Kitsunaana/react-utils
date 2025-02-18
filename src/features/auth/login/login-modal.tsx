import { loginModal, registerModal } from "../../../kernel/modals"
import { BaseModalLayout } from "../../../shared/ui/layouts/base-modal-layout"
import { UiModal } from "../../../shared/ui/modal"

export const LoginModal = () => {
  const login = loginModal.useModal()
  const register = registerModal.useModal()

  const handleStartRegister = () => {
    login.close({ hideOpacity: true })

    register.open({
      name: "",
      password: "",
      options: {
        hideOpacity: true,
      }
    })
  }

  console.log(login.options.hideOpacity)

  return (
    <UiModal
      disableBackdropClose
      isOpen={login.isOpen}
      onClose={login.close}
      className="max-w-[480px] w-full"
      hideOpacity={login.options.hideOpacity}
      renderContent={(handleClose) => (
        <BaseModalLayout 
          caption="Авторизация"
          onClose={handleClose}
          footer={(
            <span className="text-sm text-[#656F77]">
              Нет аккаунта?{" "} 
              <span
                onClick={handleStartRegister} 
                className="text-black underline cursor-pointer"
              >
                Зарегистрироваться
              </span>
            </span>
          )}
        />
      )}
    />
  )
}