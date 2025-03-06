import { createRoot } from 'react-dom/client'
import { filesUploadModal } from "./features/files-upload"
import { loginModal, registerModal } from "./kernel/modals"

import { QueryClientProvider } from '@tanstack/react-query'
import { App } from './App'
import './index.css'
import { queryClient } from './kernel/query-client'

import { ConfirmationsProvider } from "./widgets/confirmations"


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ConfirmationsProvider>
      <registerModal.ModalProvider>
        <loginModal.ModalProvider>
          <filesUploadModal.ModalProvider>
            <App />
          </filesUploadModal.ModalProvider>
        </loginModal.ModalProvider>
      </registerModal.ModalProvider>
    </ConfirmationsProvider>
  </QueryClientProvider>
)
