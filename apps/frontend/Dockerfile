# ===== STAGE 1: Builder =====
FROM node:20-alpine AS builder
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
COPY apps/frontend ./apps/frontend
# 5. Build dans l'ordre correct
RUN pnpm --filter @gazette/shared build
RUN pnpm --filter gazette_frontend build
# ===== STAGE 2: Production =====
FROM node:20-alpine
WORKDIR /gazette
RUN corepack enable && corepack prepare pnpm@latest --activate
# Copier les fichiers de configuration
COPY --from=builder /gazette/pnpm-workspace.yaml /gazette/pnpm-lock.yaml /gazette/package.json ./
# Copier le package partagé
COPY --from=builder /gazette/packages/shared ./packages/shared
# Copier le frontend
COPY --from=builder /gazette/apps/frontend ./apps/frontend
# Copier les node_modules nécessaires
COPY --from=builder /gazette/node_modules ./node_modules
COPY --from=builder /gazette/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=builder /gazette/apps/frontend/node_modules ./apps/frontend/node_modules
# Copier les binaires nécessaires
COPY --from=builder /gazette/node_modules/.bin ./node_modules/.bin
COPY --from=builder /gazette/apps/frontend/node_modules/.bin ./apps/frontend/node_modules/.bin
# Se placer dans le répertoire frontend
WORKDIR /gazette/apps/frontend
# Variables d'environnement
ENV PORT=3002
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3002
# Par défaut, on lance en production
CMD ["pnpm", "exec", "next", "start", "--hostname", "0.0.0.0", "--port", "3002"]