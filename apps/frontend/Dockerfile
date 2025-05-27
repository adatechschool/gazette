FROM node:20-alpine
RUN npm install -g pnpm

# Configure pnpm store
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/frontend/package.json ./apps/frontend/package.json

# Install dependencies
RUN pnpm install

# Install TypeScript and other dev dependencies in frontend
WORKDIR /app/apps/frontend
RUN pnpm add --save-exact --save-dev @types/node typescript @types/react @types/react-dom

# Install additional required dependencies
RUN pnpm add @emotion/styled @chakra-ui/react @chakra-ui/next-js i18next react-i18next next-themes react-icons lucide-react react-hook-form @hookform/resolvers zod

# Build shared package
WORKDIR /app
RUN cd packages/shared && pnpm build

# Copy the rest of the application
COPY . .

# Set working directory to frontend
WORKDIR /app/apps/frontend

# Expose port
EXPOSE 3002

# Start the development server
ENV PORT=3002
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["pnpm", "dev", "--hostname", "0.0.0.0", "--port", "3002"] 