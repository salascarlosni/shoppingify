import { ShoppingListController } from './shoppinglist.controller'
import { ShoppingListService } from '../services/shoppinglist.service'
import { Request, Response } from 'express'

describe('shoppingListController', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getLists', () => {
    it('returns a list of items', async () => {
      const mock = [
        {
          id: 1,
          name: 'Fruits and Vegetables',
          createdAt: new Date('2012-25-25'),
          updatedAt: new Date('2022-01-01'),
          ShoppingListItem: [
            {
              quantity: 'Avocado',
              id: 6,
              itemId: 1,
              checked: true
            }
          ]
        }
      ]

      const mRes: Partial<Response> = {}
      mRes.status = jest.fn().mockReturnValue(mRes)
      mRes.json = jest.fn().mockReturnValue(mRes)

      const mReq: Partial<Request> = {}

      jest.spyOn(ShoppingListService, 'getLists').mockResolvedValue(mock)

      await ShoppingListController.getLists(mReq as Request, mRes as Response)

      expect(ShoppingListService.getLists).toBeCalled()
      expect(mRes.status).toHaveBeenCalledWith(200)
      expect(mRes.json).toBeCalledWith(mock)
    })
  })

  describe('addList', () => {
    it('returns the new list created', async () => {
      const mock = {
        name: 'Avocado',
        id: 6,
        categoryId: 1,
        image: 'http://image.com',
        note: 'a note',
        createdAt: new Date('2022-01-01'),
        updatedAt: null
      }

      const mReq: Partial<Request> = {
        body: mock
      }

      const mRes: Partial<Response> = {}
      mRes.status = jest.fn().mockReturnValue(mRes)
      mRes.json = jest.fn().mockReturnValue(mRes)

      jest
        .spyOn(ShoppingListService, 'addList')
        .mockImplementation(async () => mock)

      await ShoppingListController.addList(mReq as Request, mRes as Response)

      expect(ShoppingListService.addList).toBeCalled()
      expect(mRes.status).toBeCalledWith(200)
      expect(mRes.json).toBeCalledWith(mock)
    })
  })
})
