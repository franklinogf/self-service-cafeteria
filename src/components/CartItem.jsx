import { Box, IconButton, Spacer } from '@chakra-ui/react'
import { IconTrashX } from '@tabler/icons-react'

export function CartItem ({ label, price, onRemove }) {
  return (
    <Box
      w={'100%'}
      p={2}
      shadow={'sm'}
      display={'flex'}
      gap={2}
    >
      <Box
        display={'flex'}
        flex={1}
        alignItems={'center'}
      >
        <span className='text-sm'>{label}</span>
        <Spacer />
        <span className='font-semibold'>${price.toFixed(2)}</span>
      </Box>
      <IconButton
        size={'sm'}
        variant={'outline'}
        colorScheme='red'
        aria-label='Remove from cart'
        icon={<IconTrashX />}
        onClick={onRemove}
      />
    </Box>
  )
}
