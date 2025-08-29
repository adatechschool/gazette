import { MediaDto, MediaSchema } from './MediaSchema'

describe('Media and Content Schema Validation', () => {
  describe('MediaSchema', () => {
    const validMedia: MediaDto = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Bondy Blog',
      description: 'Blog d\'actualités et d\'investigation',
      picture: 'https://www.bondyblog.fr/wp-content/uploads/2019/01/logo-bondy-blog.png',
      urlRss: 'https://www.bondyblog.fr/feed/'
    }

    it('should accept valid media data', () => {
      const result = MediaSchema.safeParse(validMedia)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.id).toBe(validMedia.id)
        expect(result.data.name).toBe('Bondy Blog')
        expect(result.data.urlRss).toBe('https://www.bondyblog.fr/feed/')
      }
    })

    describe('id validation', () => {
      it('should reject invalid UUID format', () => {
        const invalidUuids = [
          'not-a-uuid',
          '123',
          '550e8400-e29b-41d4-a716', // Trop court
          '550e8400-e29b-41d4-a716-446655440000-extra', // Trop long
          ''
        ]

        invalidUuids.forEach(id => {
          const invalidMedia = { ...validMedia, id }
          const result = MediaSchema.safeParse(invalidMedia)
          expect(result.success).toBe(false)
        })
      })

      it('should accept valid UUID formats', () => {
        const validUuids = [
          '550e8400-e29b-41d4-a716-446655440000',
          '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
          '00000000-0000-0000-0000-000000000000'
        ]

        validUuids.forEach(id => {
          const validMediaWithId = { ...validMedia, id }
          expect(MediaSchema.safeParse(validMediaWithId).success).toBe(true)
        })
      })
    })

    describe('name validation', () => {
      it('should reject empty name', () => {
        const invalidMedia = { ...validMedia, name: '' }
        const result = MediaSchema.safeParse(invalidMedia)
        expect(result.success).toBe(false)
        
        if (!result.success) {
          const nameError = result.error.issues.find(issue => issue.path[0] === 'name')
          expect(nameError?.message).toBe('Name is required')
        }
      })

      it('should accept single character name', () => {
        const validMediaWithShortName = { ...validMedia, name: 'A' }
        expect(MediaSchema.safeParse(validMediaWithShortName).success).toBe(true)
      })

      it('should accept long names', () => {
        const longName = 'Very Long Media Name That Should Still Be Valid'
        const validMediaWithLongName = { ...validMedia, name: longName }
        expect(MediaSchema.safeParse(validMediaWithLongName).success).toBe(true)
      })
    })

    describe('description validation', () => {
      it('should reject empty description', () => {
        const invalidMedia = { ...validMedia, description: '' }
        const result = MediaSchema.safeParse(invalidMedia)
        expect(result.success).toBe(false)
        
        if (!result.success) {
          const descError = result.error.issues.find(issue => issue.path[0] === 'description')
          expect(descError?.message).toBe('Description is required')
        }
      })

      it('should accept long descriptions', () => {
        const longDescription = 'A'.repeat(1000)
        const validMediaWithLongDesc = { ...validMedia, description: longDescription }
        expect(MediaSchema.safeParse(validMediaWithLongDesc).success).toBe(true)
      })
    })

    describe('URL validations', () => {
      it('should reject invalid picture URLs', () => {
        const invalidUrls = [
          'not-a-url',
          ''
        ]

        invalidUrls.forEach(picture => {
          const invalidMedia = { ...validMedia, picture }
          const result = MediaSchema.safeParse(invalidMedia)
          expect(result.success).toBe(false)
          
          if (!result.success) {
            const pictureError = result.error.issues.find(issue => issue.path[0] === 'picture')
            expect(pictureError?.message).toBe('Picture must be a valid URL')
          }
        })
      })

      it('should reject invalid RSS URLs', () => {
        const invalidMedia = { ...validMedia, urlRss: 'not-a-valid-url' }
        const result = MediaSchema.safeParse(invalidMedia)
        expect(result.success).toBe(false)
        
        if (!result.success) {
          const urlRssError = result.error.issues.find(issue => issue.path[0] === 'urlRss')
          expect(urlRssError?.message).toBe('RSS URL must be a valid URL')
        }
      })

      it('should accept various valid URL formats', () => {
        const validUrls = [
          'https://example.com',
          'http://example.com/path/to/resource',
          'https://subdomain.example.com/feed.xml',
          'https://example.com:8080/api/feed'
        ]

        validUrls.forEach(url => {
          const validMediaWithUrl = { 
            ...validMedia, 
            picture: url, 
            urlRss: url 
          }
          expect(MediaSchema.safeParse(validMediaWithUrl).success).toBe(true)
        })
      })
    })

    it('should reject missing required fields', () => {
      const requiredFields = ['id', 'name', 'description', 'picture', 'urlRss']
      
      requiredFields.forEach(field => {
        const incompleteMedia = { ...validMedia }
        delete incompleteMedia[field as keyof MediaDto]
        
        const result = MediaSchema.safeParse(incompleteMedia)
        expect(result.success).toBe(false)
      })
    })
  })
})

