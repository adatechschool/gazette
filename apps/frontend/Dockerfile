# Dockerfile pour DÉVELOPPEMENT uniquement
FROM node:20-alpine

# Installer les outils nécessaires
RUN apk add --no-cache git

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
RUN mkdir -p packages/shared apps/frontend apps/backend

# Se placer dans le répertoire frontend
WORKDIR /gazette/apps/frontend

# Variables d'environnement pour dev
ENV NODE_ENV=development
ENV PORT=3002
ENV NEXT_TELEMETRY_DISABLED=1
ENV WATCHPACK_POLLING=1

EXPOSE 3002

# Mode développement avec hot reload
CMD ["pnpm", "run", "dev", "--hostname", "0.0.0.0", "--port", "3002"]