import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { SubscriptionsService } from '@/modules/subscription/subscription.service'
import { UsersController } from '@/modules/user/user.controller'
import { UsersService } from '@/modules/user/user.service'

describe('usersController', () => {
  let usersController: UsersController

  // 🎭 Mocks des services
  const mockUsersService = {
    create: jest.fn(),
    getAll: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  }

  const mockSubscriptionsService = {
    findByUserId: jest.fn(),
  }

  // 🔐 Mocks pour l'authentification
  const mockJwtService = {
    sign: jest.fn(() => 'mock-jwt-token'),
    verify: jest.fn(() => ({ sub: 'user-id', email: 'test@example.com' })),
    decode: jest.fn(),
    signAsync: jest.fn(() => Promise.resolve('mock-jwt-token')),
    verifyAsync: jest.fn(() => Promise.resolve({ sub: 'user-id', email: 'test@example.com' })),
  }

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        JWT_SECRET: 'test-secret',
        JWT_EXPIRES_IN: '1h',
      }
      return config[key]
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: SubscriptionsService, useValue: mockSubscriptionsService },
        // 👉 Ajouter les services requis pour AuthGuard
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile()

    usersController = module.get<UsersController>(UsersController)
    jest.clearAllMocks()
  })

  // ----------- TESTS -----------
  describe('create', () => {
    it('should create a new user', async () => {
      const fakeUser = { id: '1', pseudo: 'john', email: 'john@test.com', password: 'secret' }
      // 🪄 ici on cast pour dire à TS que c'est un mock Jest
      ;(mockUsersService.create as jest.Mock).mockResolvedValue(fakeUser)

      const result = await usersController.create({
        pseudo: 'john',
        email: 'john@test.com',
        password: 'secret',
      })

      expect(mockUsersService.create).toHaveBeenCalledWith({
        pseudo: 'john',
        email: 'john@test.com',
        password: 'secret',
      })
      expect(result).toEqual(fakeUser)
    })
  })

  describe('getAll', () => {
    it('should return all users', async () => {
      const fakeUsers = [
        { id: '1', pseudo: 'john', email: 'john@test.com' },
        { id: '2', pseudo: 'jane', email: 'jane@test.com' },
      ]
      ;(mockUsersService.getAll as jest.Mock).mockResolvedValue(fakeUsers)

      const result = await usersController.getAll()

      expect(mockUsersService.getAll).toHaveBeenCalled()
      expect(result).toEqual(fakeUsers)
    })
  })
})
