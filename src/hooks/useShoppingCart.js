import { useContext } from 'react'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { useStudent } from './useStudent'

export function useShoppingCart () {
  const { resetStudent } = useStudent()
  const { doneShopping, setDoneShopping } = useContext(ShoppingCartContext)
  const resetShoppingCart = () => {
    setDoneShopping(true)
    resetStudent()
    setTimeout(() => {
      setDoneShopping(false)
    }, 5000)
  }
  return { resetShoppingCart, doneShopping, setDoneShopping }
}
