import {
  Button,
  IconButton,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
export function NumbersPad ({ onErase, onNumberPress }) {
  return (
        <Grid templateColumns="repeat(3,1fr)" placeContent='center' gap={1}>
          {numbers.map((number) => (
            <GridItem key={number}>
              <Button onClick={() => { onNumberPress(number) }} colorScheme="blue">{number}</Button>
            </GridItem>

          ))}
           <GridItem colStart={3}>
              <IconButton colorScheme='orange' variant='outline' icon={<IconArrowNarrowLeft/>} onClick={onErase} />
          </GridItem>

        </Grid>
  )
}
