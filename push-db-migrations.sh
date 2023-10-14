#!/bin/bash
source .env.local
echo "🔥 Pushing migrations to remote database..."
# Make sure your URL ends with ?sslmode=require for Vercel Postgres
echo "DATABASE_URL_REMOTE"
echo "$DATABASE_URL_REMOTE"
export DATABASE_URL="$DATABASE_URL_REMOTE" && npx drizzle-kit push:pg --config=drizzle.config.ts
