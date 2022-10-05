import express from 'express'
import { validation } from '../middlewares/validation'
import { ItemController } from '../controllers/item.controller'
import { ShoppingListController } from '../controllers/shoppinglist.controller'
import { addListDTO } from '../dtos/addList.dto'
import { updateListDTO } from '../dtos/updateList.dto'

export const listRouter = express.Router()

listRouter.get('/', ItemController.getItems)

listRouter.get('/:id', ShoppingListController.getList)

listRouter.post('/', validation(addListDTO), ShoppingListController.addList)

listRouter.put(
  '/:id',
  validation(updateListDTO),
  ShoppingListController.updateList
)

listRouter.delete('/:id', ShoppingListController.deleteList)
