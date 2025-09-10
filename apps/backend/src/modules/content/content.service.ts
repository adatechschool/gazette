import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Content } from 'src/entities/content.entity'
import { MediaService } from '../media/media.service'
import { RssService } from '../rss/rss.service'

@Injectable()
export class ContentService {
  constructor(
    private readonly rssService: RssService,
    private readonly em: EntityManager,
    private readonly mediaService: MediaService,
  ) {}

  async getAll(): Promise<Content[]> {
    return await this.em.find(Content, {}, {
      populate: ['media'],
      orderBy: { date: 'DESC' },
    })
  }

  async getByMediaId(mediaId: string): Promise<Content[]> {
    return await this.em.find(Content, { media: { id: mediaId } }, {
      populate: ['media'],
      orderBy: { date: 'DESC' },
    })
  }

  async getByUserSubscriptions(userId: string): Promise<Content[]> {
    // Cette méthode récupère tous les articles des médias auxquels l'utilisateur est abonné
    const contents = await this.em.find(Content, {
      media: {
        subscribers: {
          user: { id: userId },
        },
      },
    }, {
      populate: ['media'],
      orderBy: { date: 'DESC' },
    })
    return contents
  }

  async syncRssFeeds(): Promise<{ created: number, updated: number, errors: number }> {
    const em = this.em.fork()
    const result = { created: 0, updated: 0, errors: 0 }

    try {
      await em.begin()
      const rssItems = await this.rssService.fetchAllFeeds()
      const mediaMap = await this.mediaService.getMediaMap()

      for (const item of rssItems) {
        try {
          const media = mediaMap.get(item.source)

          if (!media) {
            console.warn(`[ContentService] No media found for this source: ${item.source}`)
            result.errors++
            continue
          }

          const existing = await em.findOne(Content, { link: item.link })
          if (existing) {
            result.updated++
            continue
          }

          const content = new Content()
          content.title = item.title
          content.description = item.description
          content.link = item.link
          content.date = new Date(item.pubDate)
          content.media = media
          content.createdAt = new Date()

          em.persist(content)
          result.created++
        }
        catch (itemError) {
          console.error(`Error appears while processing item: ${item.link}:`, itemError)
          result.errors++
        }
      }
      await em.flush()
      await em.commit()
    }
    catch (error) {
      try {
        await em.rollback()
      }
      catch (rollbackError) {
        console.error('Error appears during rollback:', rollbackError)
      }

      console.error('Critical error during RSS sync:', error)
      throw error
    }
    return result
  }
}
