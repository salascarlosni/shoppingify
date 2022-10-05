import { NextFunction, Request, Response } from 'express'
import {
  NotFoundException,
  UnauthenticatedException
} from '../utils/exceptions'
import { logger } from '../utils/logger'

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundException) return res.status(404).json(err.message)

  if (err instanceof UnauthenticatedException)
    return res.status(401).json(err.message)

  // Log and filter unexpected errors
  logger.error(err)
  return res.status(500).json('Internal server error')
}
