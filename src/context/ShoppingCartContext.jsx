import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext()

export function ShoppingCartProvider ({ children }) {
  const [student, setStudent] = useState(null)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [doneShopping, setDoneShopping] = useState(undefined)
  return (
    <ShoppingCartContext.Provider value={{ student, setStudent, isConfirmed, setIsConfirmed, doneShopping, setDoneShopping }}>
        {children}
    </ShoppingCartContext.Provider>
  )
}
