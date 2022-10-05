import { Prisma } from '@prisma/client'

const getStats = async () => {
  // Get top items added to list based on the quantity
  const result = await prisma?.$queryRaw(Prisma.sql`
    SELECT
      i."name" as name,
      sum (sli.quantity) * 100 / 
        (select sum (quantity) from public."ShoppingListItem") 
      as percent
    FROM public."Item" i
    LEFT JOIN public."ShoppingListItem" sli ON sli."itemId" = i.id
    GROUP BY i.id
  `)

  return result
}

export const StatsService = {
  getStats
}
