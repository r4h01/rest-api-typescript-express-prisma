interface SessionOutput {
    error: boolean
    message?: string
    data?: Session | null
  }

  interface ProductOutput {
    error: boolean
    message?: string
    data?: Product | null
  }

  interface ProductInput {
    name: string
    price: number
    description: string
    image: string
  }
  