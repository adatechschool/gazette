import type { RssItemDto } from '@/schemas/ContentSchema'

export interface FeedSource {
  name: string
  url: string
  fetch: () => Promise<RssItemDto[]>
}
