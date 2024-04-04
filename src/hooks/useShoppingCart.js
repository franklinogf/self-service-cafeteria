import { useContext } from 'react'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { useStudent } from './useStudent'
import { SCHOOLSOFT_PAYMENT_API_URL } from '../constants/school'

export function useShoppingCart () {
  const { resetStudent } = useStudent()
  const { doneShopping, setDoneShopping } = useContext(ShoppingCartContext)
  const resetShoppingCart = ({ withOrderMade = true }) => {
    if (withOrderMade) {
      setDoneShopping(true)
      setTimeout(() => {
        setDoneShopping(false)
      }, 5000)
    }
    resetStudent()
  }
  const makeOrder = async ({ items, total, studentID }) => {
    fetch(SCHOOLSOFT_PAYMENT_API_URL, {
      method: 'POST',
      body: JSON.stringify({ items, total, studentID })
    })
      .then(resetShoppingCart())
  }
  return { resetShoppingCart, doneShopping, setDoneShopping, makeOrder }
}
