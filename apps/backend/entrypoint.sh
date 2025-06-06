#!/bin/sh

echo "Waiting for postgres..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Wait for PostgreSQL to be ready to accept connections
echo "Waiting for PostgreSQL to be ready..."
until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -c '\q'; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done
echo "PostgreSQL is up - executing command"

# Create database if it doesn't exist (optionnel, souvent fait par postgres service)
# PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -c "CREATE DATABASE \"$DB_NAME\""

echo "Running migrations..."
npx mikro-orm migration:up

echo "Starting application..."
exec node dist/main.js