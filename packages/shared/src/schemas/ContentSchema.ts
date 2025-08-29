import { z } from 'zod'
import { MediaSchema } from './MediaSchema'

export const ContentSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, { message: 'Title is required' }),
  link: z.url({ message: 'Link must be a valid URL' }),
  pubDate: z.iso.datetime({ offset: true, local: true }),
  description: z.string().optional(),
  source: z.string().min(1, { message: 'Source is required' }),
  logo: z.url({ message: 'Logo must be a valid URL' }).optional(),
  media: MediaSchema.optional(),
})

export type ContentDto = z.infer<typeof ContentSchema>

export const RssItemSchema = ContentSchema.omit({ id: true })

export type RssItemDto = z.infer<typeof RssItemSchema>
