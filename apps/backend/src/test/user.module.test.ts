import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { SubscriptionsService } from '@/modules/subscription/subscription.service'
import { UsersController } from '@/modules/user/user.controller'
import { UsersService } from '@/modules/user/user.service'

describe('usersModule', () => {
  let moduleRef: TestingModule
  let usersService: UsersService
  let usersController: UsersController
  let subscriptionsService: SubscriptionsService

  beforeEach(async () => {
    // 👉 Mock factory pour créer des mocks complets
    const mockJwtService = {
      sign: jest.fn(() => 'mock-jwt-token'),
      verify: jest.fn(() => ({ sub: 'user-id', email: 'test@example.com' })),
      decode: jest.fn(),
      signAsync: jest.fn(() => Promise.resolve('mock-jwt-token')),
      verifyAsync: jest.fn(() => Promise.resolve({ sub: 'user-id', email: 'test@example.com' })),
    }

    const mockSubscriptionsService = {
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      getUserSubscriptions: jest.fn(),
    }

    const mockConfigService = {
      get: jest.fn((key: string) => {
        const config = {
          JWT_SECRET: 'test-secret',
          JWT_EXPIRES_IN: '1h',
          DATABASE_URL: 'test-db-url',
        }
        return config[key]
      }),
    }

    const mockUsersService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    }

    moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'EntityManager',
          useValue: {},
        },
        {
          provide: SubscriptionsService,
          useValue: mockSubscriptionsService,
        },

        {
          provide: 'USER_REPOSITORY',
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            persist: jest.fn(),
            flush: jest.fn(),
          },
        },
      ],
    }).compile()

    usersService = moduleRef.get<UsersService>(UsersService)
    usersController = moduleRef.get<UsersController>(UsersController)
    subscriptionsService = moduleRef.get<SubscriptionsService>(SubscriptionsService)
  })

  afterEach(async () => {
    await moduleRef.close()
  })

  it('should be defined', () => {
    expect(usersService).toBeDefined()
    expect(usersController).toBeDefined()
  })

  it('should compile the module', () => {
    expect(moduleRef).toBeDefined()
  })

  it('should have a working controller', async () => {
    expect(usersController).toBeDefined()
  })
})
