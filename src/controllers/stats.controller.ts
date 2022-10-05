import { Request, Response } from 'express'
import { StatsService } from '../services/stats.service'

const getStats = async (req: Request, res: Response) => {
  const stats = await StatsService.getStats()
  return stats
}

export const StatsController = {
  getStats
}
