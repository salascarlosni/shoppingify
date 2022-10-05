import request from 'supertest'
import { app } from '../src'

describe('itemRoutes', () => {
  describe('GET /items', () => {
    it('should respond with a list of items', async () => {
      const response = await request(app).get('/items')
      expect(response.statusCode).toBe(200)
    })
  })
})
