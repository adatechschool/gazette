FROM node:20-alpine
RUN npm install -g pnpm

# Configure pnpm store
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Set pnpm store directory
RUN pnpm config set store-dir /root/.local/share/pnpm/store

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages ./packages
COPY apps/frontend/package.json ./apps/frontend/package.json

# Clean install dependencies
RUN rm -rf node_modules
RUN pnpm install --no-frozen-lockfile

# Build shared package
WORKDIR /app
RUN cd packages/shared && pnpm build

# Copy the rest of the application
COPY . .

# Set working directory to frontend
WORKDIR /app/apps/frontend

# Clean install frontend dependencies
RUN rm -rf node_modules
RUN pnpm install --no-frozen-lockfile

# Expose port
EXPOSE 3002

# Start the development server
ENV PORT=3002
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["pnpm", "dev", "--hostname", "0.0.0.0", "--port", "3002"] 