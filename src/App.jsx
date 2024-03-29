import { IdentificationForm } from './components/IdentificationForm'
import { ShoppingCart } from './components/ShoppingCart'
import { useShoppingCart } from './hooks/useShoppingCart'
import { ShoppinCompleted } from './components/ShoppingCompleted'

function App () {
  const { isConfirmed, doneShopping } = useShoppingCart()

  if (doneShopping) {
    return <ShoppinCompleted/>
  }

  if (isConfirmed) return <ShoppingCart/>

  return <IdentificationForm/>
}

export default App
