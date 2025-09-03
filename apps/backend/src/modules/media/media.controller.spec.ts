import { faker } from '@faker-js/faker/.'
import { Collection } from '@mikro-orm/core'
import { Test } from '@nestjs/testing'
import { Subscription } from '@/entities/subscription.entity'
import { Media } from '../../entities/media.entity'
import { MediaController } from './media.controlller'
import { MediaService } from './media.service'

describe('mediaController', () => {
  let mediaController: MediaController
  let mediaService: MediaService

  const createMockMedia = (): Media => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.company.catchPhrase(),
    picture: faker.image.urlLoremFlickr({ category: 'business' }),
    urlRss: faker.internet.url(),
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
      const mockMedias: Media[] = Array.from({ length: 5 }, () => createMockMedia())

      jest.spyOn(mediaService, 'findAll').mockResolvedValue(mockMedias)

      const result = await mediaController.findAll()

      expect(result).toEqual(mockMedias)
      expect(result).toHaveLength(5)
      expect(mediaService.findAll).toHaveBeenCalledTimes(1)
    })
  })
})
