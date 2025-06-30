// rss.controller.ts
import { Controller, Get, Query } from '@nestjs/common'
import { RssService } from './rss.service'

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get()
  async getFeed(@Query('url') url: string) {
    if (!url) {
      return { error: 'Missing RSS URL' }
    }
    return await this.rssService.fetchRssFeed(url)
  }
}
