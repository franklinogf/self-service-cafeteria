import { useEffect, useState } from 'react'
import { SCHOOLSOFT_BUTTONS_API_URL } from '../constants/school'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch(SCHOOLSOFT_BUTTONS_API_URL).then(data => data.json()).then(json => {
      setProducts(json)
    })
  }, [])
  return { products }
}
