import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Providers/AuthProvider'
// import { router } from './Routes/Routes'
import './index.css'
import router from './Routes/Routes'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='mx-auto max-w-[1920px]'>
    <React.StrictMode>
      <AuthProvider >
        <QueryClientProvider client={queryClient}>

          <RouterProvider router={router} />
          <Toaster />

        </QueryClientProvider>

      </AuthProvider>
    </React.StrictMode>,
  </div>
)    
