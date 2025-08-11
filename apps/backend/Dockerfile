# ===== STAGE 1: Builder =====
FROM node:20-alpine AS builder
RUN apk add --no-cache postgresql-client netcat-openbsd
WORKDIR /gazette
# Activer corepack et pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
# 1. Copier les fichiers de configuration du workspace
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
# 2. Copier UNIQUEMENT les package.json pour optimiser le cache Docker
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
# 3. Installer les dépendances AVANT le code source
RUN pnpm install --frozen-lockfile
# 4. MAINTENANT copier le code source
COPY packages/shared ./packages/shared
COPY apps/backend ./apps/backend
# 5. Build dans l'ordre correct
RUN pnpm --filter @gazette/shared build
RUN pnpm --filter gazette_backend build
# ===== STAGE 2: Production =====
FROM node:20-alpine
RUN apk add --no-cache postgresql-client netcat-openbsd
WORKDIR /gazette
RUN corepack enable && corepack prepare pnpm@latest --activate
# Copier les fichiers de configuration
COPY --from=builder /gazette/pnpm-workspace.yaml /gazette/pnpm-lock.yaml /gazette/package.json ./
# Copier le package partagé
COPY --from=builder /gazette/packages/shared ./packages/shared
# Copier le backend
COPY --from=builder /gazette/apps/backend ./apps/backend
# Copier les node_modules nécessaires
COPY --from=builder /gazette/node_modules ./node_modules
COPY --from=builder /gazette/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=builder /gazette/apps/backend/node_modules ./apps/backend/node_modules
# Copier les binaires nécessaires
COPY --from=builder /gazette/node_modules/.bin ./node_modules/.bin
COPY --from=builder /gazette/apps/backend/node_modules/.bin ./apps/backend/node_modules/.bin
# Se placer dans le répertoire backend
WORKDIR /gazette/apps/backend
# S'assurer que le fichier entrypoint.sh est exécutable
RUN chmod +x entrypoint.sh
# S'assurer que le fichier entrypoint.sh est exécutable
RUN chmod +x entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]