import { z } from 'zod'

const appendItemDTO = z.object({
  itemId: z.number().int(),
  count: z.number().int().min(1)
})

export const addListDTO = z.object({
  name: z.string().max(20),
  items: z.array(appendItemDTO).nonempty()
})

export type IAddListDTO = z.infer<typeof addListDTO>
