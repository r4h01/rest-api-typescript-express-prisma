import db from '../utils/database'

export async function getAllProducts(limit: number, offset: number): Promise<ProductOutput> {
  try {
    const products = await db.product.findMany({
      take: limit,
      skip: offset,
    })

    return {
      error: false,
      data: products,
    }
  } catch (error) {
    return {
      error: true,
      message: `Error in getAllProducts: ${error}`,
    }
  }
}

export async function getProductById(id: number): Promise<ProductOutput> {
  try {
    const product = await db.product.findUnique({
      where: {
        id: id,
      },
    })

    if (!product) {
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
    return {
      error: true,
      message: `Error in getProductById: ${error}`,
    }
  }
}

export async function createProduct(productInput: ProductInput): Promise<ProductOutput> {
  try {
    const product = await db.product.create({
      data: {
        ...productInput,
      },
    })

    return {
      error: false,
      data: product,
    }
  } catch (error) {
    return {
      error: true,
      message: `Error in createProduct: ${error}`,
    }
  }
}

export async function updateProduct(id: number, productInput: ProductInput): Promise<ProductOutput> {
  try {
    const product = await db.product.update({
      where: {
        id: id,
      },
      data: {
        ...productInput,
      },
    })

    return {
      error: false,
      data: product,
    }
  } catch (error) {
    return {
      error: true,
      message: `Error in updateProduct: ${error}`,
    }
  }
}

export async function deleteProduct(id: number): Promise<ProductOutput> {
  try {
    const product = await db.product.delete({
      where: {
        id: id,
      },
    })

    return {
      error: false,
      data: product,
    }
  } catch (error) {
    return {
      error: true,
      message: `Error in deleteProduct: ${error}`,
    }
  }
}
