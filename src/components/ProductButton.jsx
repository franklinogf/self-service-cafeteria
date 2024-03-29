import { Button, Text, Image } from '@chakra-ui/react'

export function ProductButton ({ label, imageUrl, price, onClick }) {
  return (
        <Button
            w={'100%'}
            onClick={onClick}
            display={'flex'}
            flexDir={'column'}
            gap={2}
            colorScheme='gray'
            shadow={'md'}
            h={'100%'}
            p={2}
        >

            <Image
                shadow={'md'}
                mx={'auto'}
                boxSize={100}
                src={imageUrl}
                alt={label}

            />

            <Text flex={1} maxW={'150px'} fontSize={'sm'} color={'gray.500'} className='text-wrap'>{label}</Text>
            <Text fontWeight={'bold'}>${price}</Text>
        </Button>
  )
}
