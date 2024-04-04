import { Badge, Box, Button, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { IconBasket } from '@tabler/icons-react'
import Swal from 'sweetalert2'
import { useShoppingCart } from '../hooks/useShoppingCart'
import { useStudent } from '../hooks/useStudent'

export function CartBasket ({ items, onItemRemove }) {
  const { makeOrder, resetShoppingCart } = useShoppingCart()
  const { student } = useStudent()
  const total = items
    .reduce((sum, item) => {
      return sum + item.price
    }, 0)
  const handleOrderClick = () => {
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
        const itemsOrdered = items.flatMap(({ id, price, label }) => [{ id, price, label }])
        makeOrder({
          items: itemsOrdered,
          total,
          studentID: student.id
        })
      }
    })
  }
  const handleCancelOrder = () => {
    Swal.fire({
      title: 'Seguro que desea cancelar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--chakra-colors-blue-500)',
      confirmButtonText: 'Confirmar',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        resetShoppingCart({ withOrderMade: false })
      }
    })
  }
  return (
    <Box position={'sticky'} top={'10px'}>
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
        {items.map(({ label, price, listId }) => (
          <CartItem
            key={listId}
            label={label}
            price={price}
            onRemove={() => onItemRemove(listId)}
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
      <VStack gap={10} mt={4}>
        <Button
        isDisabled={total === 0}
        size='lg'
        onClick={handleOrderClick}
          colorScheme='blue'
          w={'100%'}
        >
          Ordernar
        </Button>
        <Spacer/>
        <Button
          onClick={handleCancelOrder}
          colorScheme='blue'
          variant="outline"
          w={'100%'}
          size='sm'
        >
          Cancelar
        </Button>
      </VStack>
    </Box>
  )
}
