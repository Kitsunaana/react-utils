## Core

### Создание объекта модального окна
```ts
export const filesUploadModal = createModal("filesUpload")
```

С помощью метода .withParams через generic можно указывать аргументы, которые нужно будет указать при открытии модаьного окна `modal.open()`
```ts
export const filesUploadModal = createModal("filesUpload")
  .withParams<File[]>()
```

### Провайдер
Для того, чтобы модальное окно работало, нужно обернуть компоненту в провайдер, который достаем из объекта модального окна, то есть `filesUploadModal.Provider` 

```tsx
<filesUploadModal.ModalProvider>
  <App />
</filesUploadModal.ModalProvider>
```

### События
Для модального окна можно зарегистрировать события вне компонент двух разных типов `afterOpen` и `afterClose`, эти события будут вызваны, соответственно, после открытия модального окна и после закрытия

```ts
filesUploadModal.onAfterClose(() => (
  console.log("Сообщение вне компоненты после закрытия окна")
))

filesUploadModal.onAfterClose(() => (
  console.log("Действий может быть сколь угодно много")
))

filesUploadModal.onAfterOpen(() => (
  console.log("Сообщение вне компоненты после открытия")
))
```

События также можно создавать в рамках компоненты, при unmount'е компоненты будет вызвана автоматически функция для отписки от события

```tsx
export const Modal = () => {
  filesUploadModal.useOnAfterOpen(() => console.log("После открытия в компонете"))

  filesUploadModal.useOnAfterClose(() => {})

  return (<div>...</div>)
}
```

### Вызов модальных окон
Для того, чтобы открыть окно нужно просто вызвать метод `modal.open`

```ts
filesUploadModal
  .useModal()
  .open()
```

Если модальному окну нужно передать аргументы 
```ts
export const useFilesUploadLogic = () => {
  const startFilesUpload = filesUploadModal.useModal()

  return (event: ChangeEvent<HTMLInputElement>) => {
    startFilesUpload.open(Array.from(event.target.files))
  }
}
```
****

## UI

### Модальное окно с анимацией при открытии

| Props         | Описание                                                                                  |
|---------------|-------------------------------------------------------------------------------------------|
| isOpen        | Состояние модального окна                                                                 |
| onClose       | Функция, которая должна изменить состояние                                                |
| renderContent | Render props, который будет отрисовывать содержимое, принимает callback закрывающий окно  |
| disableBackdropClose? | Не позволяет закрыть окно по нажатию на overlay |
| className? | Дополнительные стили |

```tsx
export const FilesUploadedModal = () => {
  const startFilesUpload = filesUploadModal.useModal()

  return (
    <UiModal
      disableBackdropClose
      isOpen={startFilesUpload.isOpen}
      onClose={startFilesUpload.close}
      renderContent={(handleClose) => <ModalBody handleClose={handleClose} />}
    />
  )
}
```