import { prisma } from '../utils/connection'
import { IItemDTO } from '../dtos/item.dto'

const getItems = async () => {
  const items = await prisma.category.findMany({
    include: {
      Item: {
        select: {
          name: true,
          id: true
        },
        where: {
          deletedAt: null
        }
      }
    }
  })

  return items
}

const getItem = async (id: number) => {
  const item = await prisma.item.findFirstOrThrow({
    where: { id }
  })

  return item
}

const addItem = async (user: IItemDTO) => {
  const item = await prisma.item.create({
    data: {
      name: user.name,
      categoryId: 10,
      note: user.note,
      image: 'fdd'
    }
  })

  return item
}

const deleteItem = async (id: number) => {
  return 1
}

export const ItemService = {
  getItems,
  addItem,
  getItem,
  deleteItem
}
