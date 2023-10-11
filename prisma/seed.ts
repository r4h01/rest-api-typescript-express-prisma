import { PrismaClient, Product } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {

  const amountOfProducts = 50

  const products: Product[] = []
  
  for (let i = 0; i < amountOfProducts; i++) {

    const id = i + 1
    const name = faker.commerce.productName()
    const description = faker.commerce.productDescription()
    const price = parseFloat(faker.commerce.price())
    const image = faker.image.urlLoremFlickr({category:'products'})
    const createdAt = faker.date.past()

    const product : Product = {
        id,
        name,
        description,
        price,
        image,
        createdAt
        }

    products.push(product)
    
  }

  const addProducts = async() => await prisma.product.createMany({data: products})

  addProducts()

}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
