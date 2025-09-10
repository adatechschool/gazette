import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ContentService } from '../content/content.service'

@Injectable()
export class JobService {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @Cron('0 0 * * *') // toutes les 24 heures (minuit)
  async handleCron() {
    console.warn('[CRON] Starting RSS feeds synchronization...')

    try {
      const result = await this.contentService.syncRssFeeds()
      console.warn(`[CRON] Synchronization completed: ${result.created} created, ${result.updated} updated, ${result.errors} errors`)
    }
    catch (error) {
      console.error('[CRON] Error during synchronization:', error)
    }
  }
}
