import { EntityManager } from "@mikro-orm/core";
import { CreateUser } from "../types/user.type.js";
import { User } from "../modules/user.entity.js";

export class UserService {
    constructor(private readonly em: EntityManager) {}
  
    async createUser(createUserDto: CreateUser): Promise<User> {
      const user = new User();
      
      Object.assign(user, {
        ...createUserDto,
      });
  
      await this.em.persistAndFlush(user);
      return user;
    }
  
    async findUserById(id: number): Promise<User | null> {
      return await this.em.findOne(User, { id });
    }
  
    async findUserByEmail(email: string): Promise<User | null> {
      return await this.em.findOne(User, { email });
    }
}