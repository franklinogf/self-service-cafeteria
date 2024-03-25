import { Button, Text } from '@chakra-ui/react'

export function ProductButton ({ label, imageUrl, price, onClick }) {
  return (
        <Button
            w={'100%'}
            onClick={onClick}
            display={'grid'}
            gap={2}
            colorScheme='gray'
            bg={'gray.300'}
            h={'100%'}
            p={2}
        >
            <img
                width={100}
                height={100}
                src={imageUrl}
            />
            <Text fontSize={'sm'} className='text-wrap'>{label}</Text>
            <Text fontWeight={'bold'}>${price}</Text>
        </Button>
  )
}
