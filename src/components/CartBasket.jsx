import { Badge, Box, Button, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { IconBasket } from '@tabler/icons-react'
import Swal from 'sweetalert2'
import { useShoppingCart } from '../hooks/useShoppingCart'

export function CartBasket ({ items, onItemRemove }) {
  const { resetShoppingCart } = useShoppingCart()
  const total = items
    .reduce((sum, item) => {
      return sum + item.price
    }, 0)

  const handlerOrderClick = () => {
    Swal.fire({
      title: 'Desea proceder con la compra?',
      text: `Se le descontara $${total.toFixed(2)} de su cuenta`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--chakra-colors-blue-500)',
      confirmButtonText: 'Confirmar',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        resetShoppingCart()
      }
    })
  }
  return (
    <Box className='backdrop-blur'>
      <Flex alignItems={'center'}>
        <Heading
          as={'h2'}
          display={'flex'}
          alignItems={'center'}
          gap={1}
          size={'md'}
        >
          Cesta <IconBasket />
        </Heading>
        <Spacer />
        <Badge colorScheme='blue'>{items.length}</Badge>
      </Flex>
      <VStack
        mt={2}
        gap={0}
      >
        {items.map(({ id, label, price }) => (
          <CartItem
            key={id}
            label={label}
            price={price}
            onRemove={() => onItemRemove(id)}
          />
        ))}
      </VStack>
      <Box mt={2}>
        <Text
          display={'flex'}
          px={'1'}
          as={'h3'}
        >
          <span>Total:</span>
          <Spacer />
          <span className='font-bold'>${total.toFixed(2)}</span>
        </Text>
      </Box>
      <Box mt={2}>
        <Button
        isDisabled={total === 0}
        onClick={handlerOrderClick}
          colorScheme='blue'
          w={'100%'}
        >
          Ordernar
        </Button>
      </Box>
    </Box>
  )
}
