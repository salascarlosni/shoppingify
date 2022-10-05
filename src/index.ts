import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import { logger } from './utils/logger'

import { errorHandler } from './middlewares/errorHandler'

// Routes
import { itemsRoutes } from './routes/items.routes'
import { listRouter } from './routes/shoppinglist.routes'
import { statsRoutes } from './routes/stats.routes'

const port = process.env.APP_PORT ?? 8000

export const app = express()

async function main() {
  // Setup server
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())

  // Routes
  app.use('/items', itemsRoutes)
  app.use('/list', listRouter)
  app.use('stats', statsRoutes)

  app.use(errorHandler)

  // Start server
  app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
  })
}

main()
  .then(async () => {
    await prisma?.$disconnect()
  })
  .catch(async (e) => {
    logger.error(e)
    await prisma?.$disconnect()
    process.exit(1)
  })
