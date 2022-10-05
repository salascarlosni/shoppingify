import { Request, Response } from 'express'
import { IAddListDTO } from '../dtos/addList.dto'
import { IUpdateListDTO } from '../dtos/updateList.dto'
import { ShoppingListService } from '../services/shoppinglist.service'

const getLists = async (req: Request, res: Response) => {
  const lists = await ShoppingListService.getLists()
  res.status(200).json(lists)
}

const getList = async (req: Request, res: Response) => {
  const listId = Number(req.params.id)
  const list = await ShoppingListService.findById(listId)

  res.status(200).json(list)
}

const deleteList = async (req: Request, res: Response) => {
  const listId = Number(req.params.id)
  const list = await ShoppingListService.deleteList(listId)

  res.status(200).json(list)
}

const addList = async (req: Request, res: Response) => {
  const data = req.body as IAddListDTO
  const list = await ShoppingListService.addList(data)

  res.status(200).json(list)
}

const updateList = async (req: Request, res: Response) => {
  const listId = Number(req.params.id)
  const data = req.body as IUpdateListDTO

  const list = await ShoppingListService.updateList(listId, data)
  res.status(200).json(list)
}

export const ShoppingListController = {
  getLists,
  deleteList,
  getList,
  addList,
  updateList
}
