import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface IOpenModalOptions {
  hideOpacity?: boolean
}

interface IModalContextProps<Value = void> {
  isOpen: boolean
  payload: Value | undefined
  open: (payload: Value) => void
  close: (options?: IOpenModalOptions, resetPayload?: boolean) => void
  options?: IOpenModalOptions
}

interface IModalProviderProps {
  children: ReactNode
}

interface IEventType<Type extends string = string, Value = unknown> {
  type: Type
  payload: Value
}

interface IEventCreator<Type extends string = string, Value = unknown> {
  (value: Value): IEventType<Type, Value>
  type: Type
  withParams: <Value2>() => IEventCreator<Type, Value2 & { options?: IOpenModalOptions }>
  useModal: () => IModalContextProps<Value>
  ModalProvider: ({ children }: IModalProviderProps) => ReactNode

  onAfterClose: (callback: () => void) => () => void
  onAfterOpen: (callback: () => void) => () => void

  useOnAfterClose: (callback: () => void) => void
  useOnAfterOpen: (callback: () => void) => void
}

export const createModal = <Type extends string = string, Value = void,>(key: Type): IEventCreator<Type, Value> => {
  const modalContext = createContext<IModalContextProps<Value> | null>(null)

  const creator = (value: Value) => ({
    type: key,
    paylaod: value,
  })

  creator.type = key

  creator.withParams = <Value2,>() => creator as unknown as IEventCreator<Type, Value2>

  creator.useModal = () => {
    const context = useContext(modalContext)
    if (context === null) throw new Error("Context not implemented")
    return context
  }

  creator.middlewares = {} as Record<string, (() => void)[]>

  const onEvent = (name: string, callback: () => void) => {
    if (creator.middlewares[name] === undefined) creator.middlewares[name] = [callback]
    else creator.middlewares[name].push(callback)

    return () => {
      const callbacks = creator.middlewares[name] 
      const index = callbacks.findIndex(fn => fn === callback)
    
      creator.middlewares[name] = [
        ...callbacks.slice(0, index),
        ...callbacks.slice(index + 1, callbacks.length)
      ]
    }
  }

  const emitEvent = (name: string) => {
    if (creator.middlewares[name]) {
      creator.middlewares[name]
        .reverse()
        .forEach(callback => callback())
    }
  }

  creator.onAfterOpen = (callback: () => void) => onEvent("afterOpen", callback)
  creator.onAfterClose = (callback: () => void) => onEvent("afterClose", callback)

  creator.useOnAfterClose = (callback: () => void) => (
    useEffect(
      () => creator.onAfterClose(callback), 
      []
    )
  )

  creator.useOnAfterOpen = (callback: () => void) => (
    useEffect(
      () => creator.onAfterOpen(callback), 
      []
    )
  )

  creator.emitAfterClose = () => emitEvent("afterClose")

  creator.emitAfterOpen = () => emitEvent("afterOpen")

  creator.ModalProvider = ({ children }: IModalProviderProps) => {
    const [test, setTest] = useState<{
      isOpen: boolean
      payload: Value
      options: IOpenModalOptions
    }>({
      isOpen: false,
      payload: undefined as unknown as Value,
      options: {
        hideOpacity: false,
      }
    })

    const handleOpen = (payload: Value & {
      options?: IOpenModalOptions
    }) => {
      setTest(prev => ({
        ...prev,
        payload: payload as unknown as Value,
        options: (payload?.options || prev.options) as IOpenModalOptions,
        isOpen: true
      }))

      creator.emitAfterOpen()
    }

    const handleClose = (
      options?: IOpenModalOptions,
      resetPayload = true
    ) => {
      setTest(prev => ({
        ...prev,
        isOpen: false,
        payload: resetPayload ? (undefined as unknown as Value) : prev.payload,
        options: {
          hideOpacity: false,
          ...(options || {}),
        },
      }))

      creator.emitAfterClose()
    }

    return (
      <modalContext.Provider 
        value={{
          ...test,
          open: handleOpen,
          close: handleClose,
        }}
      >
        {children}
      </modalContext.Provider>
    )
  }

  return creator as unknown as IEventCreator<Type, Value>
}
