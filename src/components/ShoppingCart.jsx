import { Box, Center, Flex, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { CartProducts } from './CartProducts'
import { CartBasket } from './CartBasket'

export function ShoppingCart ({ student, products }) {
  const [cart, setCart] = useState([])

  function handleProductClick (id) {
    const item = products.find((product) => product.id === id)
    const newItem = { ...item, id: crypto.randomUUID() }
    setCart((prevState) => {
      return [...prevState, newItem]
    })
  }
  function handleRemoveProductFromCart (id) {
    setCart((prevState) => {
      const newCart = prevState.filter((item) => item.id !== id)
      return newCart
    })
  }

  return (
    <Center
      pb={5}
      as={'main'}
      minH={'100vh'}
      flexDirection={'column'}
    >
      <Heading mb={2}>{student.name}</Heading>
      <Flex gap={4}>
        <Box>
          <CartProducts
            products={products}
            onProductClick={handleProductClick}
          />
        </Box>

        <Box w={250}>
          <CartBasket items={cart} onItemRemove={handleRemoveProductFromCart}/>
        </Box>
      </Flex>
    </Center>
  )
}
