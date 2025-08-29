import { z } from 'zod'

export const MediaSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  picture: z.url({ message: 'Picture must be a valid URL' }),
  urlRss: z.url({ message: 'RSS URL must be a valid URL' }),
  createdAt: z.date().optional(),
  subscribers: z.object().optional()
})

export type MediaDto = z.infer<typeof MediaSchema>
