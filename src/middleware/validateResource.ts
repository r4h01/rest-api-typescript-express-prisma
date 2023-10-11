import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.body) {
      const body = JSON.parse(req.body.body)
      schema.parse({
        body: body,
        query: req.query,
        params: req.params,
      })
      next()
    } else {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    }
  } catch (error) {
    return res.status(400).json({ error: true, message: error })
  }
}

export default validateResource
