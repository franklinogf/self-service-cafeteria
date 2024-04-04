import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Button
} from '@chakra-ui/react'
import { useState } from 'react'
import { useStudent } from '../hooks/useStudent'
export function StudentLogin () {
  const [loginError, setLoginError] = useState(false)
  const { login } = useStudent()
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError(false)
    const form = new FormData(e.target)
    const barCode = form.get('barCode')
    if (barCode === '') {
      setError(true)
      return
    }
    const logged = await login({ barCode })
    if (!logged) return setLoginError(true)
    setError(false)
  }
  return (
    <Card size={'sm'} w={[600]}>
      <CardHeader>
        <Heading textAlign={'center'} as="h1">
          Identificate
        </Heading>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardBody>
          <FormControl isInvalid={error || loginError}>
            <Input
              autoFocus
              autoComplete="off"
              name="barCode"
              variant={'filled'}
              type="number"
            />
            <FormErrorMessage>
              {loginError
                ? 'Hubo un error con el codigo de barra'
                : 'No debe de dejarlo vacio'}
            </FormErrorMessage>
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button mx={'auto'} type="submit" colorScheme="blue">
            Continuar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
