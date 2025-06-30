export interface RssArticle {
  title: string
  link: string
  pubDate: string
  description?: string
  author?: string
  category?: string
}

// Types pour les données RSS
export interface RssItem {
  title: string
  link: string
  comments?: string
  pubDate?: string
  category?: string
  description?: string
  content?: string
  author?: string
  guid?: string
}

export interface RssChannel {
  title: string
  link: string
  description: string
  language?: string
  lastBuildDate?: string
  item: RssItem[] | RssItem
}

export interface RssFeed {
  rss: {
    channel: RssChannel
  }
}

// Type pour la réponse de l'API
export interface RssApiResponse {
  rss: {
    channel: RssChannel
  }
}
