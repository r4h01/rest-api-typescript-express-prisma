import { Request, Response } from 'express'
import { DeleteProductInput, GetAllProductsInput, GetProductInput, UpdateProductInput } from '../schema/product.schema'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../service/product.service'

export async function createProductHandler(req: Request) {
  try {
    let filePath: string | undefined

    const body = JSON.parse(req.body.body)
    if (req.file) {
      const path = req.file?.path.split('\\').join('/')
      filePath = `http://localhost:8080/${path}`
      body.image = filePath
    }
    const product = await createProduct({ ...body })
    if (product.error) {
      return {
        error: true,
        message: product.message,
      }
    }

    return {
      error: false,
      data: `Product created successfully\n ${product.data}`,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: error,
    }
  }
}

export async function getProductHandler(req: Request<GetProductInput['params']>) {
  try {
    const id = parseInt(req.params.id)

    const product = await getProductById(id)
    if (product.error) {
      return {
        error: true,
        message: 'Product not found',
      }
    }

    return {
      error: false,
      data: product,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: error,
    }
  }
}

export async function getAllProductsHandler(
  req: Request<object, object, object, GetAllProductsInput['query']>,
  res: Response,
) {
  try {
    const limit = parseInt(req.query.limit)
    const offset = parseInt(req.query.offset)
    const products = await getAllProducts(limit, offset)
    if (products.error) {
      return {
        error: true,
        message: products.message,
      }
    }

    return {
      error: false,
      data: products,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: error,
    }
  }
}

export async function updateProductHandler(req: Request<UpdateProductInput['params']>) {
  try {
    const id = parseInt(req.params.id)
    const updateBody = req.body
    const findProduct = await getProductById(id)
    if (findProduct.error) {
      return {
        error: true,
        message: findProduct.message,
      }
    }

    const product = await updateProduct(id, { ...updateBody })
    if (product.error) {
      return {
        error: true,
        message: product.message,
      }
    }

    return {
      error: false,
      data: product,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: error,
    }
  }
}

export async function deleteProductHandler(req: Request<DeleteProductInput['params']>) {
  try {
    const id = parseInt(req.params.id)

    const findProduct = await getProductById(id)
    if (findProduct.error) {
      return {
        error: true,
        message: findProduct.message,
      }
    }

    const product = await deleteProduct(id)
    if (product.error) {
      return {
        error: true,
        message: product.message,
      }
    }

    return {
      error: false,
      data: 'Product deleted successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: error,
    }
  }
}
