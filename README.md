# Gazette Monorepo

Ce projet est un monorepo TypeScript comprenant :
- **Backend** : API NestJS (CommonJS) avec MikroORM et PostgreSQL
- **Frontend** : Application React (Vite)
- **Shared** : Code partagé entre le front et le back

## Prérequis
- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (gestionnaire de paquets recommandé)
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/)

## Clonage du projet
```bash
git clone  https://github.com/adatechschool/gazette
cd gazette
```

## Installation des dépendances
```bash
pnpm install
```

## Lancer le projet en local (hors Docker)

### Backend
```bash
cd apps/backend
pnpm build
pnpm start:dev
```

### Frontend
```bash
cd apps/web
pnpm dev
```

### Commandes de migration (depuis apps/backend)
```bash
# Créer une migration
pnpm db:migration:create

# Appliquer les migrations
pnpm db:migration:up

# Revenir en arrière
pnpm db:migration:down
```

---

## Utilisation avec Docker

### 1. Lancer tous les services (backend, frontend, base de données)
À la racine du projet :
```bash
docker-compose up --build
```
- Le backend sera accessible sur [http://localhost:3000](http://localhost:3000)
- Le frontend sur [http://localhost:5173](http://localhost:5173)
- La base de données Postgres sur le port 5432

### 2. Arrêter les services
```bash
docker-compose down
```

### 3. Voir les logs d'un service
```bash
docker-compose logs backend
```

### 4. Appliquer les migrations dans le conteneur backend
Ouvre un shell dans le conteneur backend :
```bash
docker-compose exec backend sh
# Puis dans le shell :
pnpm db:migration:up
```

---

## Variables d'environnement

Crée un fichier `.env` dans `apps/backend/` avec :
```
DB_NAME=gazette_db
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=motdepasse
```

---

## Structure du projet
```
apps/
  backend/    # API NestJS
  web/        # Frontend React (Vite)
packages/
  shared/     # Code partagé
```

---

## Notes
- Pour le développement avec hot reload dans Docker, une configuration supplémentaire est nécessaire.
- Les migrations MikroORM doivent être lancées dans le conteneur backend si tu utilises Docker.

---

**Pour toute question, ouvre une issue ou contacte l'équipe !**
