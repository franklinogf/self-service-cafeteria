import { Badge, Box, Button, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { IconBasket } from '@tabler/icons-react'

export function CartBasket ({ items, onItemRemove }) {
  const total = items
    .reduce((sum, item) => {
      return sum + item.price
    }, 0)
    .toFixed(2)
  return (
    <Box>
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
          <span className='font-bold'>${total}</span>
        </Text>
      </Box>
      <Box mt={2}>
        <Button
          colorScheme='blue'
          w={'100%'}
        >
          Pagar
        </Button>
      </Box>
    </Box>
  )
}
