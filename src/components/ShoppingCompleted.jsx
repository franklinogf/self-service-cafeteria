import { Center, Heading, Icon, Text } from '@chakra-ui/react'
import { IconShoppingCartCopy } from '@tabler/icons-react'

export function ShoppinCompleted () {
  return (
    <Center as="main" minH={'100vh'}>
        <div>
        <Heading size={'2xl'}>Orden realizada con exito!</Heading>
        <Text fontSize={'xl'} textAlign={'center'} mt={2}>Puede pasar a recogerla en cuanto este lista</Text>
        <Center mt={4}>
            <Icon boxSize={20} color={'green.600'} as={IconShoppingCartCopy}/>
        </Center>
        </div>
    </Center>
  )
}
