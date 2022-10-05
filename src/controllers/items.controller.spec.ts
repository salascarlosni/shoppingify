import { Request, Response } from 'express'
import { ItemService } from '../services/item.service'
import { ItemController } from './item.controller'

describe('itemsController', () => {
  describe('getItems', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('returns a list of items', async () => {
      const mReq = {}

      const mRes: Partial<Response> = {}
      mRes.status = jest.fn().mockReturnValue(mRes)
      mRes.json = jest.fn().mockReturnValue(mRes)

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

      jest.spyOn(ItemService, 'getItems').mockResolvedValue(mock)
      await ItemController.getItems(mReq as Request, mRes as Response)

      expect(ItemService.getItems).toBeCalled()
      expect(mRes.status).toBeCalledWith(200)
      expect(mRes.json).toBeCalledWith(mock)
    })
  })

  describe('addItems', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('returns the new item created', async () => {
      const mock = {
        name: 'Avocado',
        id: 6,
        categoryId: 1,
        image: 'http://image.com',
        note: 'a note',
        deletedAt: null,
        createdAt: new Date('2022-01-01'),
        updatedAt: null
      }

      const mReq = {}

      const mRes: Partial<Response> = {}
      mRes.status = jest.fn().mockReturnValue(mRes)
      mRes.json = jest.fn().mockReturnValue(mRes)

      jest.spyOn(ItemService, 'addItem').mockResolvedValue(mock)
      await ItemController.AddItem(mReq as Request, mRes as Response)

      expect(ItemService.addItem).toBeCalled()
      expect(mRes.status).toBeCalledWith(200)
      expect(mRes.json).toBeCalledWith(mock)
    })
  })
})
