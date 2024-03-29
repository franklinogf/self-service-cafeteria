import {
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  HStack,
  PinInput,
  PinInputField,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { useShoppingCart } from '../hooks/useShoppingCart'

export function IdentificationForm () {
  const { student, setStudent, setIsConfirmed } = useShoppingCart()
  const [error, setError] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const id = form.get('id')
    if (id === '') {
      setError(true)
      return
    }
    setError(false)
    setStudent({ id, name: 'Franklin Gonzalez' })
  }
  const handlePinComplete = () => {
    setIsConfirmed(true)
    setError(false)
  }
  return (
    <Center
      as='main'
      height={'100vh'}
    >
      <Card
        size={'sm'}
        w={[600]}
      >
        <CardHeader>
          <Heading
            textAlign={'center'}
            as='h1'
          >
            {student ? 'Entra tu pin' : 'Identificate'}
          </Heading>
        </CardHeader>
        {!student && (
          <form onSubmit={handleSubmit}>
            <CardBody>
              <FormControl isInvalid={error}>
                <Input
                 autoFocus
                autoComplete='off'
                  name='id'
                  variant={'filled'}
                  type='text'
                />
                <FormErrorMessage>No debe de dejarlo vacio</FormErrorMessage>
              </FormControl>
            </CardBody>
            <CardFooter>
              <Button
                mx={'auto'}
                type='submit'
                colorScheme='blue'
              >
                Continuar
              </Button>
            </CardFooter>
          </form>
        )}
        {student && (
          <CardBody>
            <FormControl isInvalid={error}>
              <Center>
                <VStack>
                  <HStack>
                    <PinInput
                    autoFocus
                      otp
                      onComplete={handlePinComplete}
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                  <FormErrorMessage>Pin incorrecto</FormErrorMessage>
                </VStack>
              </Center>
            </FormControl>
          </CardBody>
        )}
      </Card>
    </Center>
  )
}
