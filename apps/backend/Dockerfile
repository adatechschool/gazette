FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache postgresql-client netcat-openbsd

# Create app directory
WORKDIR /app

# Enable and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy all files
COPY . .

# Install dependencies from workspace
RUN pnpm install --frozen-lockfile

# Set working directory to the backend
WORKDIR /app/apps/backend

# Build the backend
RUN pnpm build

# Expose backend port
EXPOSE 3000

# Copy entrypoint script
COPY apps/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Entrypoint script to handle migration
ENTRYPOINT ["/entrypoint.sh"]