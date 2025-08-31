import { Collection } from '@mikro-orm/core'
import { Test } from '@nestjs/testing'
import { Subscription } from '@/entities/subscription.entity'
import { Media } from '../../entities/media.entity'
import { MediaController } from './media.controlller'
// import { faker } from '@faker-js/faker'
import { MediaService } from './media.service'

describe('mediaController', () => {
  let mediaController: MediaController
  let mediaService: MediaService

  // Factory function pour créer des médias de test
  const createMockMedia = (): Media => ({
    id: '96166e08-cbe6-494c-8706-db0e690763bb',
    name: 'gazette',
    description: 'agrégateur de news',
    picture: 'https://companieslogo.com/img/orig/DDOG-60ca9565.png?t=1720244491',
    urlRss: 'https://gazette.fr' + '/feed.xml',
    createdAt: new Date(),
    subscribers: new Collection<Subscription>(this),
  })

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [
        {
          provide: MediaService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile()

    mediaService = moduleRef.get(MediaService)
    mediaController = moduleRef.get(MediaController)
  })

  describe('findAll', () => {
    it('should return an array of medias', async () => {
      // Générez plusieurs médias de test
      const mockMedias: Media[] = Array.from({ length: 5 }, () => createMockMedia())

      jest.spyOn(mediaService, 'findAll').mockResolvedValue(mockMedias)

      const result = await mediaController.findAll()

      expect(result).toEqual(mockMedias)
      expect(result).toHaveLength(5)
      expect(mediaService.findAll).toHaveBeenCalledTimes(1)
    })
  })
})
