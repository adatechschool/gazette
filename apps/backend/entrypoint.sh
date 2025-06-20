#!/bin/sh

echo "Updating database schema with pnpm..."
pnpm --filter gazette_backend schema:update

echo "Starting application with pnpm..."
pnpm --filter gazette_backend start:prod
