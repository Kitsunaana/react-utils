import { loginModal, registerModal } from "../../../kernel/modals"
import { createModal } from "../../../shared/lib/modal-factory"
import { UiButton } from "../../../shared/ui/button"
import { BaseModalLayout } from "../../../shared/ui/layouts/base-modal-layout"
import { UiModal } from "../../../shared/ui/modal"
import { useRegisterUseCase } from "./use-register"

export const testRequestModal = createModal("testRequest")

testRequestModal.onAfterClose(() => {
  console.log("onAfterClose 1")
})

testRequestModal.onAfterClose(() => {
  console.log("onAfterClose 2")
})

export const TestRequestModal = () => {
  const testRequest = testRequestModal.useModal()

  const registerUseCase = useRegisterUseCase()

  testRequestModal.useOnAfterClose(() => {
    console.log(3)
  })

  return (
    <UiModal 
      isOpen={testRequest.isOpen}
      onClose={testRequest.close}
      renderContent={(handleClose) => (
        <BaseModalLayout 
          caption="Тестовый запрос"
          onClose={handleClose}
          body={(
            <UiButton
              disabled={registerUseCase.isLoading}
              caption="Выполнить запрос"
              onClick={() => (
                registerUseCase.register(undefined, {
                  onSuccess: () => testRequest.close()
                })
              )}
            />
          )}
        />
      )}
    />
  )
}

export const RegisterModalBody = () => {
  const testRequest = testRequestModal.useModal()

  return (
    <UiButton
      onClick={() => testRequest.open()}
      caption="Тестовый запрос"
    />
  )
}

export const RegisterModal = () => {
  const login = loginModal.useModal()
  const register = registerModal.useModal()

  const handleStartLogin = () => {
    register.close({ hideOpacity: true })

    login.open({
      options: {
        hideOpacity: true,
      },
    })
  }

  return (
    <testRequestModal.ModalProvider>
      <UiModal
        disableBackdropClose
        isOpen={register.isOpen}
        onClose={() => register.close({ hideOpacity: false })}
        hideOpacity={register.options.hideOpacity}
        className="max-w-[480px] w-full"
        renderContent={(handleClose) => (
          <BaseModalLayout 
            caption="Регистрация"
            onClose={handleClose}
            body={<RegisterModalBody />}
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

      <TestRequestModal />
    </testRequestModal.ModalProvider>
  )
}