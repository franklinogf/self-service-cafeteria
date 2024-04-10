import {
  FormControl,
  FormErrorMessage,
  Input,
  Button
} from '@chakra-ui/react'
// import { useState } from 'react'
export function AdminLogin ({ value, onValueChange, onSubmit, error, loginError }) {
//   const [value, setValue] = useState('')
  //   const [error, setError] = useState(false)

  //   const handleSubmit = async (e) => {
  //     e.preventDefault()
  //     setLoginError(false)
  //     const form = new FormData(e.target)
  //     const barCode = form.get('barCode')
  //     if (barCode === '') {
  //       setError(true)
  //       return
  //     }
  //     if (barCode === '12345678') {
  //       setLoginError(false)
  //       setError(false)
  //       return
  //     }
  //     setLoginError(true)
  //   }

  return (
       <form className="space-y-2" onSubmit={onSubmit}>
            <FormControl isInvalid={error || loginError}>
              <Input
                autoFocus
                autoComplete="off"
                name="barCode"
                variant={'filled'}
                type="number"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
              />
              <FormErrorMessage mt={0}>
                {loginError
                  ? 'Hubo un error con el codigo de barra'
                  : 'No debe de dejarlo vacio'}
              </FormErrorMessage>
            </FormControl>

            <Button mx={'auto'} display='block' size='sm' type="submit" colorScheme="blue">
              Continuar
            </Button>

        </form>
  )
}
