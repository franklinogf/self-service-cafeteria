import {
  FormControl,
  Center,
  HStack,
  PinInput,
  PinInputField,
  FormErrorMessage
} from '@chakra-ui/react'

export function InputsPin ({ autoFocus = false, error, pin, onPinChange, onComplete, firstInputRef, errorMessage = 'Pin incorrecto' }) {
  return (
    <FormControl justifyItems='center' isInvalid={error}>
    <Center flexDirection={'column'} gap={0}>
      <HStack>
        <PinInput
          value={pin}
          onChange={onPinChange}
          mask
          autoFocus={autoFocus}
          otp
          onComplete={onComplete}
        >
          <PinInputField ref={firstInputRef} />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <FormErrorMessage mt={0}>{errorMessage}</FormErrorMessage>
      </Center>
    </FormControl>
  )
}
