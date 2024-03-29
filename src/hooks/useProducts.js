import { useEffect, useState } from 'react'
import { SCHOOLSOFT_API_URL } from '../constants/school'

const SCHOOLSOFT_BUTTONS_API_URL = `${SCHOOLSOFT_API_URL}/buttons.php`

export const useProducts = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch(SCHOOLSOFT_BUTTONS_API_URL).then(data => data.json()).then(json => {
      setProducts(json)
    })
  }, [])
  return { products }
}
