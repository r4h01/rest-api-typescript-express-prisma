import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt.utils'

const deserializeToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: true, message: 'Access token not found' })
  }

  const accessToken = authHeader.split(' ')[1]
  if (!accessToken) {
    return next()
  }

  const isValid = await verifyToken(accessToken)
  if (!isValid) {
    return res.status(401).json({ error: true, message: 'Invalid access token' })
  }

  return next()
}

export default deserializeToken
