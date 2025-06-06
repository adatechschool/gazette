# Étape 1: Build
FROM node:20-alpine AS builder

RUN apk add --no-cache postgresql-client netcat-openbsd

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter @gazette/shared build
RUN pnpm --filter gazette_backend build

# Étape 2: Runtime minimal
FROM node:20-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app/apps/backend

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copier le build et les fichiers de config backend
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./package.json
COPY --from=builder /app/apps/backend/entrypoint.sh ./entrypoint.sh

# Copier lockfiles et workspace à la racine /app pour pnpm
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/

# Copier node_modules du builder à la racine /app/node_modules
COPY --from=builder /app/apps/backend/node_modules ./node_modules

RUN chmod +x ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
