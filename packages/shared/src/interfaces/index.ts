export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  lastPage: number
}

export interface RSSItem {
  id: string
  title: string
  date: string
  description: string
  type: string
  imageUrl?: string
  sourceUrl: string
  media: string
  medium: string
}

export interface CardHorizontalProps{
  photo: string
  date: string
  cardTitle: string
  cardDescription: string
  media: string
  medium: string
  sourceUrl?: string
}

export interface RSSResponse extends PaginatedResponse<RSSItem> {}
