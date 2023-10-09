#!/bin/bash
sourve .env.local
echo "🔥 Pushing migrations to remote database..."
# Make sure your URL ends with ?sslmode=require for Vercel Postgres
export DATABASE_URL="$REMOTE_DB_URL" && npx drizzle-kit push:pg --config=drizzle.config.ts
