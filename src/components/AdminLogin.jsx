import {
  FormControl,
  FormErrorMessage,
  Input,
  Button
} from '@chakra-ui/react'
export function AdminLogin ({ value, onValueChange, onSubmit, error, loginError }) {
  return (
       <form className="space-y-2" onSubmit={onSubmit}>
            <FormControl isInvalid={error || loginError}>
              <Input
                autoFocus
                autoComplete="off"
                name="barCode"
                variant={'filled'}
                type="password"
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
