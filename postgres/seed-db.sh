#!/bin/bash

# Load environment variables from .env file
source ../.env.local

# Export data from the local database
echo "🏄‍♂️ Import to local database..."
psql "$DATABASE_URL" < seed.sql

echo "✅ Import completed!"
