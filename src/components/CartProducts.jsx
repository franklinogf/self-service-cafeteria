import { SimpleGrid } from '@chakra-ui/react'
import { ProductButton } from './ProductButton'

export function CartProducts ({ products, onProductClick, withDiscount }) {
  return (
        <SimpleGrid
          columns={4}
          gap={2}
        >
          {products.map(({ id, label, imageUrl, price, discountedPrice }) => {
            const priceToCharge = withDiscount ? discountedPrice || price : price
            return (
            <ProductButton
              key={id}
              label={label}
              imageUrl={imageUrl}
              price={priceToCharge}
              onClick={() => onProductClick(id, priceToCharge)}
              />
            )
          })}
        </SimpleGrid>
  )
}
