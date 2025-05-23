FROM node:20-alpine

WORKDIR /app

# Install pnpm and postgres client
RUN npm install -g pnpm && \
    apk add --no-cache postgresql-client netcat-openbsd

# Copy root package files
COPY package.json pnpm-workspace.yaml ./

# Copy packages
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/shared/tsconfig.json ./packages/shared/tsconfig.json
COPY packages/shared/src ./packages/shared/src

# Copy backend package
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/backend/tsconfig.json ./apps/backend/tsconfig.json
COPY apps/backend/src ./apps/backend/src

# Install all dependencies
RUN pnpm install

# Build shared package
WORKDIR /app/packages/shared
RUN pnpm build

# Build backend
WORKDIR /app/apps/backend
RUN pnpm build

# Copy entrypoint script
COPY apps/backend/entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["./entrypoint.sh"] 