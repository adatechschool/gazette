# Dockerfile pour DÉVELOPPEMENT uniquement
FROM node:20-alpine

# Installer les outils nécessaires (PostgreSQL client, netcat, git)
RUN apk add --no-cache postgresql-client netcat-openbsd git

WORKDIR /gazette

# Activer corepack et pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copier les fichiers de configuration du workspace
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# Copier UNIQUEMENT les package.json pour optimiser le cache
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

# Installer TOUTES les dépendances (dev + prod)
RUN pnpm install --frozen-lockfile

# Le code source sera monté via volume, pas copié
# Créer les répertoires pour les volumes
RUN mkdir -p packages/shared apps/backend apps/frontend

# Copier et rendre exécutable le script d'entrée
COPY apps/backend/entrypoint.sh /gazette/apps/backend/
RUN chmod +x /gazette/apps/backend/entrypoint.sh

# Se placer dans le répertoire backend
WORKDIR /gazette/apps/backend

EXPOSE 3000

# Point d'entrée pour développement
ENTRYPOINT ["./entrypoint.sh"]