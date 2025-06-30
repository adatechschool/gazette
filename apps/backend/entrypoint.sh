#!/bin/sh

echo "Building backend..."
pnpm --filter gazette_backend build

echo "Starting application with pnpm..."
pnpm --filter gazette_backend start:prod
