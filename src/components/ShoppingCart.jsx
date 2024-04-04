import { Badge, Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { CartProducts } from './CartProducts'
import { CartBasket } from './CartBasket'
import { useProducts } from '../hooks/useProducts'
import { useStudent } from '../hooks/useStudent'

export function ShoppingCart () {
  const [cart, setCart] = useState([])
  const { student } = useStudent()
  const { products } = useProducts()

  function handleAddProduct (id, price) {
    const item = products.find((product) => product.id === id)
    const newItem = { id: item.id, label: item.label, price, listId: crypto.randomUUID() }
    setCart((prevState) => {
      return [...prevState, newItem]
    })
  }
  function handleRemoveProductFromCart (id) {
    setCart((prevState) => {
      const newCart = prevState.filter((item) => item.listId !== id)
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
      <Box as="section" my={10}>
        <Heading>{student.name}</Heading>
        <Flex justifyContent="center" gap={1}>
          <Text fontWeight="semibold" opacity={0.8}>Cantidad disponible:</Text>
          <div>
            <Badge colorScheme='blue'>{student.depositAmount}</Badge>
          </div>
        </Flex>
      </Box>
      <Flex gap={4}>
        <Box>
          <CartProducts
            withDiscount={student.hasDiscount}
            products={products}
            onProductClick={handleAddProduct}
          />
        </Box>

        <Box w={250}>
          <CartBasket items={cart} onItemRemove={handleRemoveProductFromCart}/>
        </Box>
      </Flex>
    </Center>
  )
}
