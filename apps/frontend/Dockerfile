FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/frontend ./apps/frontend

RUN pnpm install --frozen-lockfile

RUN pnpm --filter @gazette/shared build
RUN pnpm --filter gazette_frontend build

ENV PORT=3002
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3002

# Par défaut, on lance en dev
CMD ["pnpm", "--filter", "gazette_frontend", "dev", "--hostname", "0.0.0.0", "--port", "3002"]

# Pour lancer en dev, override la commande lors du docker run :
# docker run -p 3002:3002 <image> pnpm --filter gazette_frontend dev --hostname 0.0.0.0 --port 3002
