import express from 'express'
import { validation } from '../middlewares/validation'
import { ItemDTO } from '../dtos/item.dto'
import { ItemController } from '../controllers/item.controller'

export const itemsRoutes = express.Router()

itemsRoutes.get('/', ItemController.getItems)
itemsRoutes.post('/', validation(ItemDTO), ItemController.AddItem)
itemsRoutes.delete('/:id', ItemController.deleteItemById)
