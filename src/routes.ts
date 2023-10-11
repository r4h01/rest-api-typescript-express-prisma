import { Express, Request, Response } from 'express'
import { createSessionHandler } from './controller/session.controller'
import deserializeToken from './middleware/deserializeToken'
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductHandler,
  updateProductHandler,
} from './controller/product.controllers'
import validateResource from './middleware/validateResource'
import {
  createProductSchema,
  deleteProductSchema,
  getAllProductsSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema'
import { invalidateToken } from './utils/jwt.utils'
import multer from 'multer'
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  }),
})

function routes(app: Express) {
  app.use(upload.single('image'))

  app.get('/', (req: Request, res: Response) => {
    res.send('It works!')
  })

  app.post('/api/session', async (req: Request, res: Response) => {
    try {
      const response = await createSessionHandler()
      if (response.error) {
        return res.status(400).json(response)
      }

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error: true, message: error })
    }
  })

  app.post(
    '/api/product',
    [deserializeToken, validateResource(createProductSchema)],
    async (req: Request, res: Response) => {
      try {
        const response = await createProductHandler(req)
        if (response.error) {
          return res.status(400).json(response)
        }
        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
          const deactivate = await invalidateToken(token)
          if (!deactivate) {
            res.status(400).json({
              error: true,
              message: 'Something went wrong',
            })
          }
        }
        res.json(response)
      } catch (error) {
        res.status(500).json({ error: true, message: error })
      }
    },
  )

  app.put(
    '/api/product/:id',
    [deserializeToken, validateResource(updateProductSchema)],
    async (req: Request, res: Response) => {
      try {
        const response = await updateProductHandler(req as Request<{ id: string }>)
        if (response.error) {
          return res.status(400).json(response)
        }

        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
          const deactivate = await invalidateToken(token)
          if (!deactivate) {
            res.status(400).json({
              error: true,
              message: 'Something went wrong',
            })
          }
        }

        res.json(response)
      } catch (error) {
        res.status(500).json({ error: true, message: error })
      }
    },
  )

  app.get(
    '/api/product/:id',
    [deserializeToken, validateResource(getProductSchema)],
    async (req: Request, res: Response) => {
      try {
        const response = await getProductHandler(req as Request<{ id: string }>)
        if (response.error) {
          return res.status(400).json(response)
        }

        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
          const deactivate = await invalidateToken(token)
          if (!deactivate) {
            res.status(400).json({
              error: true,
              message: 'Something went wrong',
            })
          }
        }

        res.json(response)
      } catch (error) {
        res.status(500).json({ error: true, message: error })
      }
    },
  )

  app.get(
    '/api/product',
    [deserializeToken, validateResource(getAllProductsSchema)],
    async (req: Request, res: Response) => {
      try {
        const response = await getAllProductsHandler(req, res)
        if (response.error) {
          return res.status(400).json(response)
        }

        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
          const deactivate = await invalidateToken(token)
          if (!deactivate) {
            res.status(400).json({
              error: true,
              message: 'Something went wrong',
            })
          }
        }

        res.json(response)
      } catch (error) {
        res.status(500).json({ error: true, message: error })
      }
    },
  )

  app.delete(
    '/api/product/:id',
    [deserializeToken, validateResource(deleteProductSchema)],
    async (req: Request, res: Response) => {
      try {
        const response = await deleteProductHandler(req, res)
        if (response.error) {
          return res.status(400).json(response)
        }

        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
          const deactivate = await invalidateToken(token)
          if (!deactivate) {
            res.status(400).json({
              error: true,
              message: 'Something went wrong',
            })
          }
        }

        res.json(response)
      } catch (error) {
        res.status(500).json({ error: true, message: error })
      }
    },
  )
}

export default routes
