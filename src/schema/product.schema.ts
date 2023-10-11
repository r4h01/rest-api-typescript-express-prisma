import { object, number, string, TypeOf } from 'zod'

export const payloadCreate = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    price: number({
      required_error: 'Price is required',
    }),
    description: string().optional(),
    image: string().optional(),
  }),
}

export const payloadUpdate = {
  body: object({
    name: string().optional(),
    price: number().optional(),
    description: string().optional(),
    image: string().optional(),
  }),
}

const params = {
  params: object({
    id: string({
      required_error: 'Product ID is required',
    }),
  }),
}

export const createProductSchema = object({ ...payloadCreate })

export const updateProductSchema = object({ ...payloadUpdate, ...params })

export const deleteProductSchema = object({ ...params })

export const getAllProductsSchema = object({
  query: object({
    limit: string({
      required_error: 'Limit is required',
    }),
    offset: string({
      required_error: 'Offset is required',
    }),
  }),
})

export const getProductSchema = object({ ...params })

export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>
export type GetAllProductsInput = TypeOf<typeof getAllProductsSchema>
export type GetProductInput = TypeOf<typeof getProductSchema>
