import {
  Center, Card, CardHeader, CardBody, CardFooter, Heading, FormControl,
  FormErrorMessage,
  Input,
  Button
} from '@chakra-ui/react'
import { useState } from 'react'

export function IdentificationForm ({ setStudent }) {
  const [id, setId] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (id === '') {
      setError(true)
      return
    }
    setError(false)
    setStudent({ id, name: 'Franklin Gonzalez' })
  }
  return (<Center as='main' height={'100vh'}>
    <Card size={'sm'} w={[600]}>
     <CardHeader>
       <Heading textAlign={'center'} as="h1">Identificate</Heading>
     </CardHeader>
     <form onSubmit={handleSubmit}>
     <CardBody>
         <FormControl isInvalid={error}>
           <Input value={id} onChange={(e) => setId(e.target.value)} variant={'filled'} type='text'/>
           <FormErrorMessage>No debe de dejarlo vacio</FormErrorMessage>
         </FormControl>
       </CardBody>
       <CardFooter>
         <Button mx={'auto'} type='submit' colorScheme='blue'>Continuar</Button>
       </CardFooter>
     </form>
    </Card>
    </Center>)
}
