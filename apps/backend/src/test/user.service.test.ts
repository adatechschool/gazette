import { faker } from '@faker-js/faker'
import { EntityManager } from '@mikro-orm/core'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@/entities/user.entity'
import { UsersService } from '@/modules/user/user.service'
import { hashPassword } from '@/modules/user/user.utils'

// Mock de la fonction hashPassword pour éviter de hasher réellement
jest.mock('@/modules/user/user.utils', () => ({
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
}))

describe('usersService', () => {
  let UserService: UsersService

   // On crée un faux EntityManager avec toutes ses méthodes mockées
let mockEntityManager: {
  findOneOrFail: jest.Mock,
  findOne: jest.Mock,
  findAll: jest.Mock,
  persistAndFlush: jest.Mock,
  removeAndFlush: jest.Mock,
  transactionnal: jest.Mock
};

  beforeEach(async () => {

mockEntityManager = {
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    findAll: jest.fn(),
    persistAndFlush: jest.fn(),
    removeAndFlush: jest.fn(),
    transactionnal: jest.fn()
  };
    // Configuration du module de test NestJS
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, // Le service qu'on teste
        {
          provide: EntityManager, // On remplace EntityManager par notre mock
          useValue: mockEntityManager,
        },
      ],
    }).compile()

    UserService = module.get<UsersService>(UsersService)

    // On remet à zéro tous les mocks avant chaque test
    jest.clearAllMocks()
  })

  describe('create one user', () => {
    it('must check the user is successfully created', async () => {
      // 1. ARRANGE - On prépare les données de test
      const userData = {
        pseudo: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      // On simule un mot de passe haché (comme bcrypt le ferait)
      const fakeHashedPassword = faker.string.alphanumeric(60);
      (hashPassword as jest.Mock).mockResolvedValue(fakeHashedPassword)

      // 2. ACT - On exécute la fonction à tester
      const result = await UserService.create(userData)

      // 3. ASSERT - On vérifie que tout s'est bien passé
      expect(hashPassword).toHaveBeenCalledWith(userData.password) // Le mot de passe a été haché
      expect(result.pseudo).toBe(userData.pseudo) // Les données sont correctes
      expect(result.email).toBe(userData.email)
      expect(result.password).toBe(fakeHashedPassword) // Le mot de passe est haché
      expect(mockEntityManager.persistAndFlush).toHaveBeenCalled() // L'utilisateur a été enregistré
    })

    it('must hash the password', async () => {
      // On teste spécifiquement que le hashage fonctionne
      const userData = {
        pseudo: faker.internet.username(),
        email: faker.internet.email(),
        password: 'fake_password123',
      }

      const fakeHashedPassword = 'fake_hashed_password';
      (hashPassword as jest.Mock).mockResolvedValue(fakeHashedPassword)

      await UserService.create(userData)

      // Vérifie que hashPassword a été appelé exactement 1 fois avec le bon mot de passe
      expect(hashPassword).toHaveBeenCalledTimes(1)
      expect(hashPassword).toHaveBeenCalledWith(userData.password)
    })
  })

  describe('findOne', () => {
    it('must send an error if the user doest exist', async () => {
      // ARRANGE - On prépare un email qui n'existe pas
      const emailInexistant = faker.internet.email()

      // On simule que la BDD ne trouve pas l'utilisateur
      mockEntityManager.findOneOrFail.mockRejectedValue(new Error('User not found'))

      // ACT & ASSERT - On teste que l'erreur est bien lancée
      await expect(UserService.findOne(emailInexistant)).rejects.toThrow('User not found')

      // Vérifie que la méthode a été appelée avec le bon email
      expect(mockEntityManager.findOneOrFail).toHaveBeenCalledWith(User, { email: emailInexistant })
    })

    it('must send the user data if the user exists', async () => {
      // ARRANGE - On crée un faux utilisateur
      const fakeUser = {
        id: faker.string.uuid(),
        pseudo: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.string.alphanumeric(60),
      } as User

      // On simule que la BDD trouve l'utilisateur
      mockEntityManager.findOneOrFail.mockResolvedValue(fakeUser)

      // ACT - On cherche l'utilisateur
      const result = await UserService.findOne(fakeUser.email)

      // ASSERT - On vérifie qu'on récupère bien le bon utilisateur
      expect(result).toEqual((expect.objectContaining({
        email: fakeUser.email,
      })))
      expect(mockEntityManager.findOneOrFail).toHaveBeenCalledWith(User, { email: fakeUser.email })
    })
  })

  describe('getAll', () => {
    it('must send all the users', async () => {
      // ARRANGE - On crée plusieurs faux utilisateurs
      const fakeUsers = [
        {
          id: faker.string.uuid(),
          pseudo: faker.internet.username(),
          email: faker.internet.email(),
          password: faker.string.alphanumeric(60),
          createdAt: faker.date.past(),
          lastConnection: faker.date.recent(),
          subscriptions: [],
        },
        {
          id: faker.string.uuid(),
          pseudo: faker.internet.username(),
          email: faker.internet.email(),
          password: faker.string.alphanumeric(60),
          createdAt: faker.date.past(),
          lastConnection: faker.date.past(),
          subscriptions: null,
        },
      ] as unknown as User[]

      // On simule que la BDD renvoie ces utilisateurs
      mockEntityManager.findAll.mockResolvedValue(fakeUsers)

      // ACT - On récupère tous les utilisateurs
      const result = await UserService.getAll()

      // ASSERT - On vérifie qu'on a bien récupéré tous les utilisateurs
      expect(result).toHaveLength(2)
      expect(result[0].pseudo).toBe(fakeUsers[0].pseudo)
      expect(result[1].email).toBe(fakeUsers[1].email)
      expect(mockEntityManager.findAll).toHaveBeenCalledWith(User)
    })

    it('must send an empty array if there is no user', async () => {
      // ARRANGE - La BDD ne contient aucun utilisateur
      mockEntityManager.findAll.mockResolvedValue([])

      // ACT
      const result = await UserService.getAll()

      // ASSERT - On doit avoir un tableau vide
      expect(result).toEqual([])
    })
  })

/*   describe('delete', () => {
    it('must delete an existing user', async () => {
      // ARRANGE - On crée un faux utilisateur à supprimer
      const userId = faker.string.uuid()
      const fakeUser = {
        id: userId,
        pseudo: faker.internet.username(),
        email: faker.internet.email(),
        subscriptions: [], // Ajoutez les relations que le service populate
        likes: []
      } as unknown as User

      // On simule que la BDD trouve l'utilisateur
      mockEntityManager.findOne.mockResolvedValue(fakeUser)
      // On simule que la suppression se passe bien
      mockEntityManager.removeAndFlush.mockResolvedValue(undefined)

      // ACT - On supprime l'utilisateur
      await UserService.delete(userId)

      // ASSERT - On vérifie que les bonnes méthodes ont été appelées
     expect(mockEntityManager.findOne).toHaveBeenCalledWith(User, { id: userId }, {
      populate: ['subscriptions', 'likes'],
    })
      expect(mockEntityManager.removeAndFlush).toHaveBeenCalledWith(fakeUser)
    })
  }) */
})
