// import { Router, Request, Response } from 'express';
// import { EntityManager } from '@mikro-orm/core';
// import { User } from '../entities/user.entity.js';

// const router : Router = Router();
// // Route pour récupérer tous les utilisateurs
// router.get('/users', async (req: Request, res: Response) => {
//   try {
//     const em: EntityManager = req.app.locals.orm.em; // Accéder à l'ORM depuis l'instance d'app
//     const users = await em.find(User, {}); // Récupérer tous les utilisateurs
//     return res.status(200).json(users); // Répondre avec la liste des utilisateurs
//   } catch (error) {
//     return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
//   }
// });
// export default router;