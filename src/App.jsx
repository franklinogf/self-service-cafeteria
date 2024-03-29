import { IdentificationForm } from './components/IdentificationForm'
import { ShoppingCart } from './components/ShoppingCart'
import { useShoppingCart } from './hooks/useShoppingCart'
import { ShoppinCompleted } from './components/ShoppingCompleted'
import { useStudent } from './hooks/useStudent'

function App () {
  const { doneShopping } = useShoppingCart()
  const { pinConfirmed } = useStudent()

  if (doneShopping) {
    return <ShoppinCompleted/>
  }

  if (pinConfirmed) return <ShoppingCart/>

  return <IdentificationForm/>
}

export default App
