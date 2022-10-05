import { Request, Response } from 'express'
import { ItemService } from '../services/item.service'
import { IItemDTO } from '../dtos/item.dto'

const AddItem = async (req: Request, res: Response) => {
  const data = req.body as IItemDTO
  const newItem = await ItemService.addItem(data)

  res.status(200).json(newItem)
}

const getItems = async (req: Request, res: Response) => {
  const items = await ItemService.getItems()

  res.status(200).json(items)
}

const deleteItemById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const items = await ItemService.deleteItem(id)

  res.status(200).json(items)
}

export const ItemController = {
  AddItem,
  getItems,
  deleteItemById
}
