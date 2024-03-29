import { useEffect, useState } from 'react'

const SCHOOL_ACRONYNM = window.location.pathname.split('/')[1] || 'demo'
const SCHOOL_SOFT_API_URL = `https://www.schoolsoftpr.org/${SCHOOL_ACRONYNM}/cafeteria/self-service/requests/buttons.php`

export const useProducts = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch(SCHOOL_SOFT_API_URL).then(data => data.json()).then(json => {
      setProducts(json)
    })
  }, [])
  return { products }
}
