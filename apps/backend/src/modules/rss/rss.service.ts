//Parser et fetch des flux RSS

import { Injectable } from '@nestjs/common';
import Parser from 'rss-parser';
import { ContentParsed, NormalizedItem } from '@gazette/shared';



@Injectable()
export class RssService {
  async fetchFeed(url: string) {
    const parser = new Parser();
    const feed = await parser.parseURL(url);
    return this.normalizedFeed(feed);
  }
  private normalizedFeed(rawFeed: any): ContentParsed { //rawFeed --> objet qui contient les données du flux/RSS pasées (au format "natif")
    return {
      id: rawFeed.id,
      title: rawFeed.title, 
      date: rawFeed.date,
      description: rawFeed.description,
      type: rawFeed.type,
      mediaId: rawFeed.mediaId,
      createdAt: rawFeed.date,
      items: rawFeed.items?.map(item => this.normalizedItem(item)) || []
    }
  }
  private normalizedItem(rawItem: any): NormalizedItem {
    return {
      title:  rawItem.title,
      description: rawItem.description,
      link: rawItem.link,
      pubDate: rawItem.pubDate,
      author: rawItem.author || '',
      categories: rawItem.categories || ''

    }
  }
}