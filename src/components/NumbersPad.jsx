import {
  Button,
  Grid,
  GridItem
} from '@chakra-ui/react'
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
export function NumbersPad ({ onCancel, onNumberPress }) {
  return (
        <Grid templateColumns="repeat(3,1fr)" justifyContent="center" gap={1}>
            {numbers.map((number) => (
              <GridItem key={number}>
                <Button onClick={() => { onNumberPress(number) }} colorScheme="blue">{number}</Button>
              </GridItem>
            ))}
            <GridItem colSpan={2}>
              <Button onClick={onCancel}>
                Cancelar
              </Button>
            </GridItem>
          </Grid>
  )
}
