import { SimpleGrid } from '@chakra-ui/react'
import { ProductButton } from './ProductButton'

export function CartProducts ({ products, onProductClick }) {
  return (
        <SimpleGrid
          columns={4}
          gap={2}
        >
          {products.map(({ id, label, imageUrl, price }) => (
              <ProductButton key={id} label={label} imageUrl={imageUrl} price={price} onClick={() => onProductClick(id)}/>
          ))}
        </SimpleGrid>
  )
}
