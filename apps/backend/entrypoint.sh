#!/bin/sh

echo "Waiting for database to be ready..."
# Attendre que PostgreSQL soit prêt
until pg_isready -h postgres -p 5432 -U postgres; do
  echo "Waiting for postgres..."
  sleep 2
done
echo "Updating database schema with pnpm..."
pnpm --filter gazette_backend migration:up

echo "Starting application with pnpm..."
pnpm --filter gazette_backend start:prod
