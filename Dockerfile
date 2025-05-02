FROM node:20 AS base
WORKDIR /app
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY apps ./apps
COPY packages ./packages

# Installation des dépendances
RUN npm install -g pnpm && pnpm install

# --- BACKEND  ---
FROM base AS backend-build
WORKDIR /app/apps/backend
RUN pnpm build

# --- FRONTEND  ---
FROM base AS frontend-build
WORKDIR /app/apps/web
RUN pnpm build

# --- BACKEND RUNTIME ---
FROM node:20-slim AS backend-runtime
WORKDIR /app
COPY --from=backend-build /app/apps/backend/dist ./apps/backend/dist
COPY --from=base /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=base /app/packages/shared ./packages/shared
COPY --from=base /app/apps/backend/.env ./apps/backend/.env

# Ajout du script wait-for.sh
COPY wait-for.sh ./wait-for.sh
RUN chmod +x wait-for.sh

# Installation de netcat
RUN apt-get update && apt-get install -y netcat-openbsd


RUN npm install -g pnpm && pnpm install --prod --filter backend...

CMD ["./wait-for.sh", "db:5432", "--", "node", "apps/backend/dist/src/main.js"]

# --- FRONTEND ---
FROM nginx:alpine AS frontend-runtime
COPY --from=frontend-build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80