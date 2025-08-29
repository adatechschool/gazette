import nock from 'nock'
import { createGenericRssFeed } from './generic-rss.feed'

describe('createGenericRssFeed', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  it('should parse basic RSS feed correctly', async () => {
    const mockXml = `
      <rss>
        <channel>
          <item>
            <title>Test Article</title>
            <link>https://example.com/article</link>
            <pubDate>Mon, 01 Jan 2024 12:00:00 GMT</pubDate>
            <description>Test description</description>
          </item>
        </channel>
      </rss>
    `
    
    nock('https://bondyblog.fr/feed/')
      .get('/rss')
      .reply(200, mockXml)

    const feed = createGenericRssFeed({
      sourceKey: "bondyblog"
    })
    
    const items = await feed.fetch()
    expect(items[0].source).toBe('bondyblog')
  })
})