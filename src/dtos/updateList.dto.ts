import { z } from 'zod'

const updateItemDTO = z.object({
  itemId: z.number().int(),
  count: z.number().int().min(1),
  checked: z.boolean()
})

export const updateListDTO = z.object({
  name: z.string().max(20),
  items: z.array(updateItemDTO).nonempty()
})

export type IUpdateListDTO = z.infer<typeof updateListDTO>
