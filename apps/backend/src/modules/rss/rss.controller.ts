import { RssItemDto } from '@gazette/shared'
import { Controller, Get } from '@nestjs/common'
import { RssService } from './rss.service'

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get()
  async getFeeds(): Promise<RssItemDto[]> {
    return this.rssService.fetchAllFeeds()
  }

  @Get('bondyblog')
  async getBondyBlogFeed(): Promise<RssItemDto[]> {
    return this.rssService.fetchBondyBlogFeed()
  }

  @Get('arretsurimage')
  async getArretSurImageFeed(): Promise<RssItemDto[]> {
    return this.rssService.fetchArretSurImageFeed()
  }

  @Get('blast')
  async getBlastFeed(): Promise<RssItemDto[]> {
    return this.rssService.fetchBlastFeed()
  }

  @Get('invisibleoranges')
  async getInvisibleOrangesFeed(): Promise<RssItemDto[]> {
    return this.rssService.fetchInvisibleOrangesFeed()
  }

  @Get('metalorgie')
  async getMetalorgieFeed(): Promise<RssItemDto[]> {
    return this.rssService.fetchMetalorgieFeed()
  }
}
