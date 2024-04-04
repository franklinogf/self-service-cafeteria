import {
  Card,
  HStack,
  PinInput,
  PinInputField,
  Text,
  Image,
  Heading,
  CardHeader,
  CardBody,
  FormControl,
  Center,
  FormErrorMessage,
  Button,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useStudent } from '../hooks/useStudent'
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
export function ConfirmStudentPin () {
  const { student, confirmPin, resetStudent } = useStudent()
  const [pin, setPin] = useState('')
  const firstPinInput = useRef()
  const [error, setError] = useState(false)

  const handlePinComplete = (pinCode) => {
    console.log(pin)
    const confirmed = confirmPin({ pinCode })
    if (!confirmed) {
      setError(true)
      setPin('')
      firstPinInput.current.focus()
    }
  }

  const handlePinCancel = () => {
    resetStudent()
  }
  const handleNumberClick = (number) => {
    const newPin = pin.concat(number)
    console.log({ newPin })
    setPin(newPin)
    if (newPin.length === 4) {
      handlePinComplete(newPin)
    }
  }

  return (
    <Card size={'sm'} w={[600]}>
      <CardHeader>
        <Heading textAlign={'center'} as="h1">
          Entra tu pin
        </Heading>
      </CardHeader>
      <CardBody>
        <Text textAlign={'center'} fontSize={'lg'} opacity={0.7}>
          {student.name}
        </Text>
        {student.profilePictureUrl && (
          <Image
            mx={'auto'}
            src={student.profilePictureUrl}
            my={2}
            boxSize={100}
            alt={student.name}
          />
        )}
        <Center flexDirection={'column'} gap={5}>
          <section>
            <FormControl justifyItems='center' isInvalid={error}>
            <Center flexDirection={'column'} gap={0}>
              <HStack>
                <PinInput
                  value={pin}
                  onChange={setPin}
                  mask
                  autoFocus
                  otp
                  onComplete={handlePinComplete}
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
          </section>
          <Grid templateColumns="repeat(3,1fr)" justifyContent="center" gap={1}>
            {numbers.map((number) => (
              <GridItem key={number}>
                <Button onClick={() => { handleNumberClick(number) }} colorScheme="blue">{number}</Button>
              </GridItem>
            ))}
            <GridItem colSpan={2}>
              <Button onClick={handlePinCancel}>
                Cancelar
              </Button>
            </GridItem>
          </Grid>
        </Center>
      </CardBody>
    </Card>
  )
}
