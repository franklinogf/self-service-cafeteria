import { useEffect, useState } from 'react'
import { IdentificationForm } from './components/IdentificationForm'
import { ShoppingCart } from './components/ShoppingCart'
const SCHOOL_ACRONYNM = window.location.pathname.split('/')[1] || 'demo'
const SCHOOL_SOFT_API_URL = `https://www.schoolsoftpr.org/${SCHOOL_ACRONYNM}/cafeteria/self-service/requests/buttons.php`
function App () {
  const [student, setStudent] = useState(null)
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch(SCHOOL_SOFT_API_URL).then(data => data.json()).then(json => {
      console.log({ json })
      setProducts(json)
    })
  }, [])
  function handleSetStudent (student) {
    setStudent(student)
  }

  if (student) {
    return <ShoppingCart student={student} products={products}/>
  }

  return <IdentificationForm setStudent={handleSetStudent}/>
}

export default App
