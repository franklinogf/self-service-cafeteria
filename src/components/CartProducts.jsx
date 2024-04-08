import { SimpleGrid } from '@chakra-ui/react'
import { ProductButton } from './ProductButton'
import { useStudent } from '../hooks/useStudent'

export function CartProducts ({ products, onProductClick, withDiscount }) {
  const { student } = useStudent()
  return (
        <SimpleGrid
          columns={4}
          gap={2}
        >
          {products.map(({ id, label, imageUrl, price, priceForHighGrades, discountedPrice }) => {
            const priceToCharge = withDiscount
              ? discountedPrice || (student.gradeNumber < 7 ? price : priceForHighGrades || price)
              : student.gradeNumber < 7 ? price : priceForHighGrades || price

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
