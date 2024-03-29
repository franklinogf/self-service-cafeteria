import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ShoppingCartProvider } from './context/ShoppingCartContext.jsx'
import { StudentProvider } from './context/StudentContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ChakraProvider>
      <StudentProvider>
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      </StudentProvider>
   </ChakraProvider>
  </React.StrictMode>
)
