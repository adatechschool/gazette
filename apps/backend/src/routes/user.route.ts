import { Router } from "express";
import { Request, Response } from "express"; // Add these imports
import { UserService } from "../services/user.service.js";
import { UserController } from "../controllers/user.controller.js";
import { DI } from "../mikro-orm.config.js";

const router: Router = Router();

const getUserController = () => {
    const userService = new UserService(DI.em.fork());
    return new UserController(userService);
};

// Fix 1: Bind the methods correctly
router.post('/', async (req: Request, res: Response) => {
    await getUserController().createUser(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await getUserController().getUser(req, res);
});

export { router as userRouter };