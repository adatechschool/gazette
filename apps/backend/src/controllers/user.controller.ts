import { UserService } from "../services/user.service.js";
import { CreateUser } from "../types/user.type.js";
import { Request, Response } from "express";


export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<void> {

      const userData: CreateUser = req.body;

      const user = await this.userService.createUser(userData);
    };
    
    async getUser(req: Request, res: Response): Promise<void> {
        
        const userId = Number(req.params.id);
        const user = await this.userService.findUserById(userId);
          
        }
  
}