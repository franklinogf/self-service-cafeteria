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
  Text,
  Image
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useStudent } from '../hooks/useStudent'

export function IdentificationForm () {
  const { student, login, confirmPin, resetStudent } = useStudent()
  const [error, setError] = useState(false)
  const [pin, setPin] = useState('')
  const firstPinInput = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const barCode = form.get('barCode')
    if (barCode === '') {
      setError(true)
      return
    }
    login({ barCode })
    setError(false)
  }

  const handlePinComplete = (pinCode) => {
    const confirmed = confirmPin({ pinCode })
    setError(!confirmed)
    setPin('')
    firstPinInput.current.focus()
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
        {!student && (
          <>
            <CardHeader>
              <Heading
                textAlign={'center'}
                as='h1'
              >
                Identificate
              </Heading>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardBody>
                <FormControl isInvalid={error}>
                  <Input
                    autoFocus
                    autoComplete='off'
                    name='barCode'
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
          </>
        )}
        {student && (
          <>
            <CardHeader>
              <Heading
                textAlign={'center'}
                as='h1'
              >
                Entra tu pin
              </Heading>
            </CardHeader>
            <CardBody>
              <Text
                textAlign={'center'}
                fontSize={'lg'}
                opacity={0.7}
              >
                {student.name}
              </Text>
              <Image
                mx={'auto'}
                src={student.profilePictureUrl}
                my={2}
                boxSize={100}
                alt={student.name}
              />
              <FormControl isInvalid={error}>
                <Center flexDirection={'column'} gap={0}>
                    <HStack>
                      <PinInput
                        value={pin}
                        onChange={(value) => setPin(value)}
                        mask
                        autoFocus
                        otp
                        onComplete={(value) => handlePinComplete(value)}
                      >
                        <PinInputField ref={firstPinInput} />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <FormErrorMessage mt={0}>Pin incorrecto</FormErrorMessage>
                </Center>
              </FormControl>
            </CardBody>
            <CardFooter>
              <Button
              onClick={() => resetStudent()}
                mx={'auto'}
                colorScheme='gray'
              >
                Cancelar
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </Center>
  )
}
