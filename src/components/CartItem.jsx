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
                  <span>{label}</span>
                  <Spacer />
                  <span>${price}</span>
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
