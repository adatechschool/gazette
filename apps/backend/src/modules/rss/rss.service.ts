import { Injectable } from '@nestjs/common'
import { XMLParser } from 'fast-xml-parser'

@Injectable()
export class RssService {
  async fetchRssFeed(url: string) {
    const res = await fetch(url)
    const xml = await res.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    })

    const parsed = parser.parse(xml)
    return parsed
  }
}
