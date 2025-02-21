import { MikroORM } from '@mikro-orm/core';
import { User } from '../entities/user.entity.js'; // Import de l'entité User

async function createUser() {
  const orm = await MikroORM.init(); // Initialisation de MikroORM
  const em = orm.em.fork(); // Fork de l'EntityManager

  // Création d'un utilisateur en dur
  const user = em.create(User, {
      pseudo: 'john_doe',
      email: 'john.doe@example.com',
      password: 'hashed_password_here',
      createdAt: '',
      lastConnection: ''
  });

  // Persistance dans la base de données
  await em.persistAndFlush(user);

  console.log('User created:', user);
}

createUser().catch(err => {
  console.error(err);
});
