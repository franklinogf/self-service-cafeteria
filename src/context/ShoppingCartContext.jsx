import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext()

export function ShoppingCartProvider ({ children }) {
  const [doneShopping, setDoneShopping] = useState(undefined)
  return (
    <ShoppingCartContext.Provider value={{ doneShopping, setDoneShopping }}>
        {children}
    </ShoppingCartContext.Provider>
  )
}
