import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface IModalContextProps<Value = void> {
  isOpen: boolean
  payload: Value | undefined
  open: (payload: Value) => void
  close: () => void
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
  withParams: <Value2>() => IEventCreator<Type, Value2>
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
    const [isOpen, setIsOpen] = useState(false)
    const [payload, setPayload] = useState<Value>()

    const handleOpen = (payload: Value) => {
      setPayload(payload)
      setIsOpen(true)

      creator.emitAfterOpen()
    }

    const handleClose = (resetPayload = true) => {
      setIsOpen(false)
      if (resetPayload) setPayload(() => {
        console.log("CLEAR")
        return undefined
      })

      creator.emitAfterClose()
    }

    return (
      <modalContext.Provider 
        value={{
          isOpen,
          payload,
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
