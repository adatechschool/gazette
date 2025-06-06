FROM node:20-alpine

# Augmenter la limite mémoire Node.js
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Installer pnpm via corepack (plus sûr que npm install -g)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copier les fichiers de base du monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/frontend ./apps/frontend

# Installer toutes les dépendances (dev + prod)
RUN pnpm install --frozen-lockfile

# Builder le package partagé
RUN pnpm --filter @gazette/shared build

# Builder le frontend
RUN pnpm --filter gazette_frontend build

# Exposer le port
EXPOSE 3002

# Définir les variables d'env
ENV PORT=3002
ENV NEXT_TELEMETRY_DISABLED=1

# Lancer le frontend en mode dev
CMD ["pnpm", "--filter", "gazette_frontend", "dev", "--hostname", "0.0.0.0", "--port", "3002"]
