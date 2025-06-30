import { XMLParser } from 'fast-xml-parser'

export const BondyBlogFeed = {
  name: 'bondyblog',
  url: 'https://www.bondyblog.fr/feed/',

  async fetch() {
    const res = await fetch(this.url)
    const xml = await res.text()
    const parser = new XMLParser()
    const data = parser.parse(xml)

    console.warn('Raw RSS data:', JSON.stringify(data, null, 2))

    return data
  },
}
