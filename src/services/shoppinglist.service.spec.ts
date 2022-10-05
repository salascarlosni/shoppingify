import { prisma } from '../utils/connection'
import { ShoppingListService } from '../services/shoppinglist.service'

describe('shoppingListService', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getLists', () => {
    it('returns a list of shopping lists', async () => {
      const mock = [
        {
          id: 1,
          name: 'My Shopping list',
          createdAt: new Date(),
          updatedAt: null
        }
      ]

      jest.spyOn(prisma.shoppingList, 'findMany').mockResolvedValue(mock)
      const result = await ShoppingListService.getLists()

      expect(prisma.shoppingList.findMany).toBeCalled()
      expect(result).toBe(mock)
    })
  })
})
