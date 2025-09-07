import { FeedSource, RssItemDto } from '@gazette/shared'
import * as Parser from 'rss-parser'
import { RSS_SOURCES, RssSourceKey } from '../../../config/rss-sources'

interface GenericRssConfig {
  sourceKey: RssSourceKey
  titleCleaner?: (title: string) => string
  descriptionCleaner?: (description: string) => string
  extractLogo?: (channel: unknown) => string | undefined
}

export function createGenericRssFeed(config: GenericRssConfig): FeedSource {
  const sourceConfig = RSS_SOURCES[config.sourceKey]
  const parser = new Parser()

  return {
    name: config.sourceKey,
    url: sourceConfig.url,

    async fetch(): Promise<RssItemDto[]> {
      const feed = await parser.parseURL(this.url)

      return feed.items.map(item => ({
        title: config.titleCleaner ? config.titleCleaner(item.title || '') : (item.title || ''),
        link: item.link || '',
        pubDate: item.pubDate || '',
        description: item.contentSnippet || item.content,
        source: config.sourceKey,
        logo: feed.image?.url || sourceConfig.picture,
      }))
    },
  }
}
