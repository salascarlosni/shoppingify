import { z } from 'zod'

export const ItemDTO = z.object({
  name: z.string(),
  category: z.string(),
  note: z.optional(z.string()),
})

export type IItemDTO = z.infer<typeof ItemDTO>
