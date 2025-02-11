import { createRoot } from 'react-dom/client'
import { App } from "./App"
import { loginModal, registerModal } from "./kernel/modals"

import './index.css'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <registerModal.ModalProvider>
//       <loginModal.ModalProvider>
//         <App />
//       </loginModal.ModalProvider>
//     </registerModal.ModalProvider>
//   </StrictMode>,
// )

createRoot(document.getElementById('root')!).render(
  <registerModal.ModalProvider>
    <loginModal.ModalProvider>
      <App />
    </loginModal.ModalProvider>
  </registerModal.ModalProvider>
)
