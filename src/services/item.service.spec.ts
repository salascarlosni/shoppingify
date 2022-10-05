import { prisma } from '../utils/connection'
import { ItemService } from '../services/item.service'

describe('itemsService', () => {
  describe('getItems', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('returns a list of items', async () => {
      const mock = [
        {
          id: 1,
          name: 'Fruits and Vegetables',
          Item: [
            {
              name: 'Avocado',
              id: 6
            }
          ]
        }
      ]

      jest.spyOn(prisma.category, 'findMany').mockResolvedValue(mock)
      const result = await ItemService.getItems()

      expect(result).toBe(mock)
    })
  })
})
