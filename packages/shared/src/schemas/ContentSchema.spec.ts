import { ContentDto, ContentSchema } from "./ContentSchema"
import { MediaSchema } from "./MediaSchema"

describe('ContentSchema', () => {
    const validContent: ContentDto = {
      id: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Article de test',
      link: 'https://example.com/article',
      pubDate: '2024-01-15T10:30:00+01:00',
      description: 'Description de l\'article',
      source: 'bondyblog',
      logo: 'https://example.com/logo.png',
    }

    it('should accept valid content data with all fields', () => {
      const result = ContentSchema.safeParse(validContent)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.title).toBe('Article de test')
        expect(result.data.source).toBe('bondyblog')
      }
    })

    it('should accept content without optional fields', () => {
      const minimalContent = {
        id: validContent.id,
        title: validContent.title,
        link: validContent.link,
        pubDate: validContent.pubDate,
        source: validContent.source
        // description, logo, media sont optionnels
      }
      
      const result = ContentSchema.safeParse(minimalContent)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.description).toBeUndefined()
        expect(result.data.logo).toBeUndefined()
        expect(result.data.media).toBeUndefined()
      }
    })

    describe('title validation', () => {
      it('should reject empty title', () => {
        const invalidContent = { ...validContent, title: '' }
        const result = ContentSchema.safeParse(invalidContent)
        expect(result.success).toBe(false)
        
        if (!result.success) {
          const titleError = result.error.issues.find(issue => issue.path[0] === 'title')
          expect(titleError?.message).toBe('Title is required')
        }
      })

      it('should accept long titles', () => {
        const longTitle = 'Very Long Title That Might Exceed Normal Length But Should Still Be Valid'
        const validContentWithLongTitle = { ...validContent, title: longTitle }
        expect(ContentSchema.safeParse(validContentWithLongTitle).success).toBe(true)
      })
    })

    describe('link validation', () => {
      it('should reject invalid URLs', () => {
        const invalidUrls = [
          'not-a-url',
          ''
        ]

        invalidUrls.forEach(link => {
          const invalidContent = { ...validContent, link }
          const result = ContentSchema.safeParse(invalidContent)
          expect(result.success).toBe(false)
          
          if (!result.success) {
            const linkError = result.error.issues.find(issue => issue.path[0] === 'link')
            expect(linkError?.message).toBe('Link must be a valid URL')
          }
        })
      })
    })

    describe('pubDate validation', () => {
      it('should accept valid ISO datetime formats', () => {
        const validDates = [
          '2024-01-15T10:30:00Z',
          '2024-01-15T10:30:00+01:00',
          '2024-01-15T10:30:00-05:00',
          '2024-12-31T23:59:59.999Z'
        ]

        validDates.forEach(pubDate => {
          const validContentWithDate = { ...validContent, pubDate }
          expect(ContentSchema.safeParse(validContentWithDate).success).toBe(true)
        })
      })

      it('should reject invalid date formats', () => {
        const invalidDates = [
          '2024-01-15',
          '10:30:00',
          '2024/01/15 10:30:00',
          'Jan 15, 2024',
          'invalid-date'
        ]

        invalidDates.forEach(pubDate => {
          const invalidContent = { ...validContent, pubDate }
          const result = ContentSchema.safeParse(invalidContent)
          expect(result.success).toBe(false)
        })
      })
    })

    describe('source validation', () => {
      it('should reject empty source', () => {
        const invalidContent = { ...validContent, source: '' }
        const result = ContentSchema.safeParse(invalidContent)
        expect(result.success).toBe(false)
        
        if (!result.success) {
          const sourceError = result.error.issues.find(issue => issue.path[0] === 'source')
          expect(sourceError?.message).toBe('Source is required')
        }
      })
    })

    describe('optional logo validation', () => {
      it('should accept undefined logo', () => {
        const contentWithoutLogo = { ...validContent }
        delete contentWithoutLogo.logo
        
        expect(ContentSchema.safeParse(contentWithoutLogo).success).toBe(true)
      })

      it('should reject invalid logo URL', () => {
        const invalidContent = { ...validContent, logo: 'not-a-url' }
        const result = ContentSchema.safeParse(invalidContent)
        expect(result.success).toBe(false)
        
        if (!result.success) {
          const logoError = result.error.issues.find(issue => issue.path[0] === 'logo')
          expect(logoError?.message).toBe('Logo must be a valid URL')
        }
      })
    })

  })

  describe('ContentWithMediaSchema', () => {
    const validContentWithMedia: ContentDto = {
      id: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Article avec média',
      link: 'https://example.com/article',
      pubDate: '2024-01-15T10:30:00+01:00',
      source: 'bondyblog',
      media: {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Bondy Blog',
        description: 'Blog d\'actualités',
        picture: 'https://www.bondyblog.fr/wp-content/uploads/2019/01/logo-bondy-blog.png',
        urlRss: 'https://www.bondyblog.fr/feed/'
      }
    }

    it('should accept valid content with media', () => {
      const result = ContentSchema.safeParse(validContentWithMedia)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.media?.name).toBe('Bondy Blog')
        expect(result.data.media?.id).toBe('550e8400-e29b-41d4-a716-446655440002')
      }
    })

    it('should accept content with media having optional fields', () => {
      const contentWithFullMedia = {
        ...validContentWithMedia,
        media: {
          ...validContentWithMedia.media,
          picture: 'https://example.com/picture.png',
          urlRss: 'https://example.com/rss.xml'
        }
      }
      
      expect(ContentSchema.safeParse(contentWithFullMedia).success).toBe(true)
    })

    it('should reject content with invalid media structure', () => {
      const invalidContent = {
        ...validContentWithMedia,
        media: {
          id: 'invalid-uuid',
          name: '', // Nom vide
        }
      }
      
      const result = ContentSchema.safeParse(invalidContent)
      expect(result.success).toBe(false)
    })

    it('should inherit all ContentSchema validations', () => {
      const invalidContent = {
        ...validContentWithMedia,
        title: '', // Titre vide
        link: 'invalid-url',
        media: validContentWithMedia.media
      }
      
      const result = ContentSchema.safeParse(invalidContent)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(2) // Titre + link
      }
    })
  })

  describe('Type inference', () => {
    it('should infer correct MediaDto type', () => {
      const validMedia = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test Media',
        description: 'Test Description',
        picture: 'https://example.com/pic.jpg',
        urlRss: 'https://example.com/rss.xml'
      }
      
      const result = MediaSchema.safeParse(validMedia)
      
      if (result.success) {
        const data = result.data
        expect(typeof data.id).toBe('string')
        expect(typeof data.name).toBe('string')
        expect(typeof data.description).toBe('string')
        expect(typeof data.picture).toBe('string')
        expect(typeof data.urlRss).toBe('string')
      }
    })

    it('should infer correct ContentDto type with optionals', () => {
      const validContent = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        title: 'Test',
        link: 'https://example.com',
        pubDate: '2024-01-15T10:30:00Z',
        source: 'test-source'
      }
      
      const result = ContentSchema.safeParse(validContent)
      
      if (result.success) {
        const data = result.data
        expect(typeof data.description).toBe('undefined')
        expect(typeof data.logo).toBe('undefined')
        expect(typeof data.media).toBe('undefined')
      }
    })
  })
