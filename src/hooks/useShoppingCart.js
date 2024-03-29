import { useContext } from 'react'
import { ShoppingCartContext } from '../context/ShoppingCartContext'

export function useShoppingCart () {
  const { student, setStudent, isConfirmed, setIsConfirmed, doneShopping, setDoneShopping } = useContext(ShoppingCartContext)
  const resetShoppingCart = () => {
    setDoneShopping(true)
    setStudent(null)
    setIsConfirmed(false)
    setTimeout(() => {
      setDoneShopping(false)
    }, 5000)
  }
  return { student, setStudent, isConfirmed, setIsConfirmed, resetShoppingCart, doneShopping, setDoneShopping }
}
