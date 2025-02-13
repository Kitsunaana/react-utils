import { createRoot } from 'react-dom/client'
import { App, filesUploadModal } from "./App"
import { loginModal, registerModal } from "./kernel/modals"

import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './kernel/query-client'

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <registerModal.ModalProvider>
      <loginModal.ModalProvider>
        <filesUploadModal.ModalProvider>
          <App />
        </filesUploadModal.ModalProvider>
      </loginModal.ModalProvider>
    </registerModal.ModalProvider>
  </QueryClientProvider>
)
