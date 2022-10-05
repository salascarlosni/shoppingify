import express from 'express'
import { StatsController } from '../controllers/stats.controller'

export const statsRoutes = express.Router()

statsRoutes.get('/stats', StatsController.getStats)
