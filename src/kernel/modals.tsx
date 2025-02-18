import { createModal } from "../shared/lib/modal-factory"

export const registerModal = createModal("register")
  .withParams<{ 
    name: string
    password: string
 }>()

export const loginModal = createModal("login")
    .withParams()
