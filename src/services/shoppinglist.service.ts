import { NotFoundException } from '../utils/exceptions'
import { IAddListDTO } from '../dtos/addList.dto'
import { IUpdateListDTO } from '../dtos/updateList.dto'
import { prisma } from '../utils/connection'

const getLists = async () => {
  const shoppingLists = await prisma?.shoppingList.findMany()
  return shoppingLists
}

const findById = async (id: number) => {
  const shoopingList = await prisma?.shoppingList.findFirst({
    where: { id },
    include: {
      ShoppingListItem: true
    }
  })

  if (shoopingList === null)
    throw new NotFoundException('Shopping list not found')

  return shoopingList
}

const deleteList = async (id: number) => {
  // Validate that the list exists
  await findById(id)

  const shoopingListDeleted = await prisma?.shoppingList.delete({
    where: { id }
  })

  return shoopingListDeleted
}

const addList = async (list: IAddListDTO) => {
  // Map items to prisma model
  const items: any[] = []

  list.items.forEach((item) =>
    items.push({ quantity: item.count, itemId: item.itemId })
  )

  // Add the new list and their items assigned
  const addedList = await prisma?.shoppingList.create({
    data: {
      name: list.name,
      ShoppingListItem: {
        createMany: {
          data: items
        }
      }
    }
  })

  return addedList
}

const updateList = async (id: number, list: IUpdateListDTO) => {
  // Map items to prisma model
  const items: any[] = []

  list.items.forEach((item) =>
    items.push({
      quantity: item.count,
      itemId: item.itemId,
      checked: item.checked
    })
  )

  // Delete previous items and add the new ones,
  // and then update the list fields
  const listUpdated = await prisma?.$transaction([
    prisma.shoppingListItem.deleteMany({
      where: {
        shoppingListId: id
      }
    }),

    prisma.shoppingList.update({
      where: { id },
      data: {
        name: list.name,
        ShoppingListItem: {
          createMany: {
            data: items
          }
        }
      }
    })
  ])

  return listUpdated
}

export const ShoppingListService = {
  getLists,
  findById,
  deleteList,
  addList,
  updateList
}
